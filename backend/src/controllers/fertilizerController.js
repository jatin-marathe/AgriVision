// const { fail, proxy } = require('../utils/aiProxy');

// const LIMITS = {
//     rainfall: [0, 5000],
//     area_ha: [0.01, 10000],
// };
// const SOILS = ['clay', 'sandy', 'loamy', 'silt', 'red', 'black', 'alluvial'];
// const STAGES = ['basal', 'vegetative', 'flowering', 'maturity'];
// const PH_CLASSES = ['unknown', 'acidic', 'slightly_acidic', 'neutral', 'alkaline'];

// exports.getCrops = (req, res) => proxy(res, '/fertilizer/crops', { method: 'GET' });

// exports.recommend = (req, res) => {
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
//     if (!SOILS.includes(body.soil_type)) return fail(res, 400, 'Invalid soil type');
//     if (!STAGES.includes(body.growth_stage)) return fail(res, 400, 'Invalid growth stage');
//     if (!PH_CLASSES.includes(body.ph_class)) return fail(res, 400, 'Invalid soil pH selection');
//     payload.soil_type = body.soil_type;
//     payload.growth_stage = body.growth_stage;
//     payload.ph_class = body.ph_class;

//     return proxy(res, '/fertilizer/recommend', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
// };

const { fail, proxy } = require('../utils/aiProxy');

const LIMITS = {
    rainfall: [0, 5000],
    area_ha: [0.01, 10000],
};
const SOILS = ['clay', 'sandy', 'loamy', 'silt', 'red', 'black', 'alluvial'];
const STAGES = ['basal', 'vegetative', 'flowering', 'maturity'];
const PH_CLASSES = ['unknown', 'acidic', 'slightly_acidic', 'neutral', 'alkaline'];

exports.getCrops = (req, res) => proxy(res, '/fertilizer/crops', { method: 'GET' });

exports.recommend = (req, res) => {
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
    if (!SOILS.includes(body.soil_type)) return fail(res, 400, 'Invalid soil type');
    if (!STAGES.includes(body.growth_stage)) return fail(res, 400, 'Invalid growth stage');
    if (!PH_CLASSES.includes(body.ph_class)) return fail(res, 400, 'Invalid soil pH selection');
    payload.soil_type = body.soil_type;
    payload.growth_stage = body.growth_stage;
    payload.ph_class = body.ph_class;

    return proxy(
        res,
        '/fertilizer/recommend',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        },
        { user: req.user._id, service: 'fertilizer', inputs: payload }
    );
};
