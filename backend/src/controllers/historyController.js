const ServiceRecord = require('../models/ServiceRecord');
const { success, ApiError } = require('../utils/apiResponse');

const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

// GET /api/history?service=&page=&limit=  — the caller's own records only
exports.list = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const filter = { user: req.user._id };
    if (req.query.service !== undefined && req.query.service !== '') {
      if (!ServiceRecord.SERVICES.includes(req.query.service)) {
        throw new ApiError(400, 'Invalid service filter');
      }
      filter.service = req.query.service;
    }

    const [items, total] = await Promise.all([
      ServiceRecord.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ServiceRecord.countDocuments(filter),
    ]);

    return success(res, 200, 'History fetched', {
      items,
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/history/:id  — full record, only if it belongs to the caller
exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!OBJECT_ID.test(id)) throw new ApiError(404, 'Record not found');

    // The owner is part of the query, so someone else's record is indistinguishable from a missing one.
    const record = await ServiceRecord.findOne({ _id: id, user: req.user._id })
      .select('+result')
      .lean();
    if (!record) throw new ApiError(404, 'Record not found');

    return success(res, 200, 'Record fetched', record);
  } catch (error) {
    return next(error);
  }
};
