const mongoose = require('mongoose');
const { DAY_OF_WEEK } = require('../common/constant');

const MedicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    scheduleType: { type: String, enum: ['onetime', 'daily', 'weekly'] },
    time: String,
    dayOfWeek: {
      type: String,
      enum: DAY_OF_WEEK,
    },
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medication', MedicationSchema);
