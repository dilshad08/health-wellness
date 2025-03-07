const Medication = require('../models/Medication');
const { StatusCodes } = require('http-status-codes');
const { createMedicationSchedular } = require('../services/medication');
const User = require('../models/User');
const { mongoose } = require('../config/database');

exports.createMedication = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const medication = new Medication({ ...req.body, userId: req.userId });
    const user = await User.findOne({ _id: req.userId }).lean();
    await createMedicationSchedular({ ...req.body, userEmail: user.email });
    await medication.save();
    await session.commitTransaction();
    session.endSession();
    res.status(StatusCodes.CREATED).json({ data: medication });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
