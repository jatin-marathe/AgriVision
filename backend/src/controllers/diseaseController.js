// const { fail, proxy } = require('../utils/aiProxy');

// const LIMITS = {
//     rainfall: [0, 1000],
//     temperature: [-5, 50],
//     humidity: [0, 100],
// };
// const PESTICIDE_DAYS = ['0_7', '8_14', '15_30', '30_plus'];
// const SEASONS = ['summer', 'monsoon', 'post_monsoon', 'winter'];

// exports.getCrops = (req, res) => proxy(res, '/disease/crops', { method: 'GET' });

// exports.assess = (req, res) => {
//     const body = req.body || {};
//     const payload = {};

//     if (typeof body.crop !== 'string' || !body.crop.trim() || body.crop.length > 40) {
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
//     if (!PESTICIDE_DAYS.includes(body.pesticide_days)) return fail(res, 400, 'Invalid pesticide application period');
//     if (!SEASONS.includes(body.season)) return fail(res, 400, 'Invalid season');
//     payload.pesticide_days = body.pesticide_days;
//     payload.season = body.season;

//     return proxy(res, '/disease/assess', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
// };

const { fail, proxy } = require('../utils/aiProxy');

const LIMITS = {
    rainfall: [0, 1000],
    temperature: [-5, 50],
    humidity: [0, 100],
};
const PESTICIDE_DAYS = ['0_7', '8_14', '15_30', '30_plus'];
const SEASONS = ['summer', 'monsoon', 'post_monsoon', 'winter'];

exports.getCrops = (req, res) => proxy(res, '/disease/crops', { method: 'GET' });

exports.assess = (req, res) => {
    const body = req.body || {};
    const payload = {};

    if (typeof body.crop !== 'string' || !body.crop.trim() || body.crop.length > 40) {
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
    if (!PESTICIDE_DAYS.includes(body.pesticide_days)) return fail(res, 400, 'Invalid pesticide application period');
    if (!SEASONS.includes(body.season)) return fail(res, 400, 'Invalid season');
    payload.pesticide_days = body.pesticide_days;
    payload.season = body.season;

    return proxy(
        res,
        '/disease/assess',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        },
        { user: req.user._id, service: 'disease', inputs: payload }
    );
};
