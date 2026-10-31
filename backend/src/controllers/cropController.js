// const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// const LIMITS = {
//     N: [0, 200],
//     P: [0, 200],
//     K: [0, 300],
//     temperature: [0, 50],
//     humidity: [0, 100],
//     ph: [0, 14],
//     rainfall: [0, 500],
// };
// const SEASONS = ['kharif', 'rabi', 'zaid', 'year_round'];
// const SOILS = ['clay', 'sandy', 'loamy', 'black', 'red', 'alluvial', 'laterite'];

// const fail = (res, status, message) => res.status(status).json({ success: false, message });

// exports.recommend = async (req, res) => {
//     const body = req.body || {};
//     const payload = {};

//     for (const [key, [min, max]] of Object.entries(LIMITS)) {
//         const raw = body[key];
//         const value = Number(raw);
//         if (raw === undefined || raw === null || raw === '' || !Number.isFinite(value) || value < min || value > max) {
//             return fail(res, 400, `${key} must be a number between ${min} and ${max}`);
//         }
//         payload[key] = value;
//     }
//     if (body.season) {
//         if (!SEASONS.includes(body.season)) return fail(res, 400, 'Invalid season');
//         payload.season = body.season;
//     }
//     if (body.soil_type) {
//         if (!SOILS.includes(body.soil_type)) return fail(res, 400, 'Invalid soil type');
//         payload.soil_type = body.soil_type;
//     }

//     const controller = new AbortController();
//     const timer = setTimeout(() => controller.abort(), 10000);
//     try {
//         const response = await fetch(`${AI_SERVICE_URL}/predict`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//             signal: controller.signal,
//         });
//         const json = await response.json().catch(() => ({}));
//         if (!response.ok) {
//             const message = typeof json.detail === 'string' ? json.detail : 'Prediction service rejected the request';
//             return fail(res, response.status === 503 ? 503 : 502, message);
//         }
//         return res.json({ success: true, data: json });
//     } catch (err) {
//         if (err.name === 'AbortError') return fail(res, 504, 'Prediction service timed out');
//         return fail(res, 503, 'Prediction service is unavailable. Make sure the AI service is running.');
//     } finally {
//         clearTimeout(timer);
//     }
// };

const { fail, proxy } = require('../utils/aiProxy');

const LIMITS = {
    N: [0, 200],
    P: [0, 200],
    K: [0, 300],
    temperature: [0, 50],
    humidity: [0, 100],
    ph: [0, 14],
    rainfall: [0, 500],
};
const SEASONS = ['kharif', 'rabi', 'zaid', 'year_round'];
const SOILS = ['clay', 'sandy', 'loamy', 'black', 'red', 'alluvial', 'laterite'];
const WATER = ['low', 'medium', 'high'];
const EXPERIENCE = ['beginner', 'intermediate', 'experienced'];
const MARKET = ['food', 'cash', 'mixed'];
const AREA_LIMITS = [0.01, 10000];

const isBlank = (v) => v === undefined || v === null || v === '';

exports.recommend = (req, res) => {
    const body = req.body || {};
    const payload = {};

    for (const [key, [min, max]] of Object.entries(LIMITS)) {
        const raw = body[key];
        const value = Number(raw);
        if (isBlank(raw) || !Number.isFinite(value) || value < min || value > max) {
            return fail(res, 400, `${key} must be a number between ${min} and ${max}`);
        }
        payload[key] = value;
    }
    if (body.season) {
        if (!SEASONS.includes(body.season)) return fail(res, 400, 'Invalid season');
        payload.season = body.season;
    }
    if (body.soil_type) {
        if (!SOILS.includes(body.soil_type)) return fail(res, 400, 'Invalid soil type');
        payload.soil_type = body.soil_type;
    }

    // Farm-fit inputs: optional, but validated when supplied
    if (!isBlank(body.water_availability)) {
        if (!WATER.includes(body.water_availability)) return fail(res, 400, 'Invalid water availability');
        payload.water_availability = body.water_availability;
    }
    if (!isBlank(body.farming_experience)) {
        if (!EXPERIENCE.includes(body.farming_experience)) return fail(res, 400, 'Invalid farming experience');
        payload.farming_experience = body.farming_experience;
    }
    if (!isBlank(body.market_preference)) {
        if (!MARKET.includes(body.market_preference)) return fail(res, 400, 'Invalid market preference');
        payload.market_preference = body.market_preference;
    }
    if (!isBlank(body.area_ha)) {
        const area = Number(body.area_ha);
        if (!Number.isFinite(area) || area < AREA_LIMITS[0] || area > AREA_LIMITS[1]) {
            return fail(res, 400, `area_ha must be a number between ${AREA_LIMITS[0]} and ${AREA_LIMITS[1]}`);
        }
        payload.area_ha = area;
    }

    return proxy(
        res,
        '/predict',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        },
        { user: req.user._id, service: 'crop', inputs: payload }
    );
};
