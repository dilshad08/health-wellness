const mongoose = require('mongoose');

const MedicineMetaDataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
    name: String,
    description: String,
    time: String,
    scheduleType: String,
    date: Date,
    status: { type: String, enum: ['pending', 'done'], default: 'pending' },
    bullJobId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicineMetaData', MedicineMetaDataSchema);
