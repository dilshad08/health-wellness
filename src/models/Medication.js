const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  scheduleType: { type: String, enum: ['onetime', 'daily', 'weekly'] },
  time: String,
  dayOfWeek: {
    type: String,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model('Medication', MedicationSchema);
