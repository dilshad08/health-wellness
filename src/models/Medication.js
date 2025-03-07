const mongoose = require('mongoose');
const { DAY_OF_WEEK } = require('../common/constant');

const MedicationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model('Medication', MedicationSchema);
