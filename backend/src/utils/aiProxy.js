// const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// const fail = (res, status, message) => res.status(status).json({ success: false, message });

// // Forward a request to the Python AI service and relay the result.
// const proxy = async (res, path, init) => {
//     const controller = new AbortController();
//     const timer = setTimeout(() => controller.abort(), 10000);
//     try {
//         const response = await fetch(`${AI_SERVICE_URL}${path}`, { ...init, signal: controller.signal });
//         const json = await response.json().catch(() => ({}));
//         if (!response.ok) {
//             const message = typeof json.detail === 'string' ? json.detail : 'Prediction service rejected the request';
//             const status = response.status === 503 ? 503 : response.status === 422 ? 400 : 502;
//             return fail(res, status, message);
//         }
//         return res.json({ success: true, data: json });
//     } catch (err) {
//         if (err.name === 'AbortError') return fail(res, 504, 'Prediction service timed out');
//         return fail(res, 503, 'Prediction service is unavailable. Make sure the AI service is running.');
//     } finally {
//         clearTimeout(timer);
//     }
// };

// module.exports = { fail, proxy };


const ServiceRecord = require('../models/ServiceRecord');
const summarize = require('./summarizeRecord');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const fail = (res, status, message) => res.status(status).json({ success: false, message });

/**
 * Forward a request to the Python AI service and relay the result.
 * When `record` ({ user, service, inputs }) is given, a successful result is
 * also saved to the user's history. A failed save never fails the prediction;
 * the response says so via `record.saved`.
 */
const proxy = async (res, path, init, record) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
        const response = await fetch(`${AI_SERVICE_URL}${path}`, { ...init, signal: controller.signal });
        const json = await response.json().catch(() => ({}));
        clearTimeout(timer);

        if (!response.ok) {
            const message = typeof json.detail === 'string' ? json.detail : 'Prediction service rejected the request';
            const status = response.status === 503 ? 503 : response.status === 422 ? 400 : 502;
            return fail(res, status, message);
        }

        let meta;
        if (record) {
            try {
                const doc = await ServiceRecord.create({
                    user: record.user,
                    service: record.service,
                    inputs: record.inputs,
                    result: json,
                    summary: summarize(record.service, json),
                });
                meta = { saved: true, id: doc._id };
            } catch (saveErr) {
                console.error('Failed to save service record:', saveErr.message);
                meta = { saved: false };
            }
        }

        return res.json({ success: true, data: json, record: meta });
    } catch (err) {
        if (err.name === 'AbortError') return fail(res, 504, 'Prediction service timed out');
        return fail(res, 503, 'Prediction service is unavailable. Make sure the AI service is running.');
    } finally {
        clearTimeout(timer);
    }
};

module.exports = { fail, proxy };
