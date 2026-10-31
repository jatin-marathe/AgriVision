// const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// const LIMITS = {
//     rainfall: [0, 5000],
//     pesticides: [0, 1000000],
//     temperature: [-10, 50],
// };

// const fail = (res, status, message) => res.status(status).json({ success: false, message });

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

// exports.getCrops = (req, res) => proxy(res, '/yield/crops', { method: 'GET' });

// exports.predict = (req, res) => {
//     const body = req.body || {};
//     const payload = {};

//     if (typeof body.crop !== 'string' || !body.crop.trim() || body.crop.length > 60) {
//         return fail(res, 400, 'crop is required');
//     }
//     payload.crop = body.crop.trim();

//     for (const [key, [min, max]] of Object.entries(LIMITS)) {
//         const raw = body[key];
//         const value = Number(raw);
//         if (raw === undefined || raw === null || raw === '' || !Number.isFinite(value) || value < min || value > max) {
//             return fail(res, 400, `${key} must be a number between ${min} and ${max}`);
//         }
//         payload[key] = value;
//     }

//     return proxy(res, '/yield/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
// };

const { fail, proxy } = require('../utils/aiProxy');

const LIMITS = {
    rainfall: [0, 5000],
    pesticides: [0, 1000000],
    temperature: [-10, 50],
};

exports.getCrops = (req, res) => proxy(res, '/yield/crops', { method: 'GET' });

exports.predict = (req, res) => {
    const body = req.body || {};
    const payload = {};

    if (typeof body.crop !== 'string' || !body.crop.trim() || body.crop.length > 60) {
        return fail(res, 400, 'crop is required');
    }
    payload.crop = body.crop.trim();

    for (const [key, [min, max]] of Object.entries(LIMITS)) {
        const raw = body[key];
        const value = Number(raw);
        if (raw === undefined || raw === null || raw === '' || !Number.isFinite(value) || value < min || value > max) {
            return fail(res, 400, `${key} must be a number between ${min} and ${max}`);
        }
        payload[key] = value;
    }

    return proxy(
        res,
        '/yield/predict',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        },
        { user: req.user._id, service: 'yield', inputs: payload }
    );
};
