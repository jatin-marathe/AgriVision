const mongoose = require('mongoose');

const SERVICES = ['crop', 'yield', 'disease', 'fertilizer'];

const serviceRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: String,
      enum: SERVICES,
      required: true,
    },
    // Validated request payload exactly as sent to the AI service
    inputs: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    // Full result. Excluded from list queries; the detail endpoint selects it explicitly.
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      select: false,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

serviceRecordSchema.index({ user: 1, createdAt: -1 });
serviceRecordSchema.index({ user: 1, service: 1, createdAt: -1 });

const ServiceRecord = mongoose.model('ServiceRecord', serviceRecordSchema);
ServiceRecord.SERVICES = SERVICES;

module.exports = ServiceRecord;
