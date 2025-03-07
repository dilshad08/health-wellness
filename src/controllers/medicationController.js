const Medication = require('../models/Medication');
const MedicationMetaData = require('../models/MedicineMetaData');
const { StatusCodes } = require('http-status-codes');
const { createMedicationSchedular } = require('../services/medication');
const User = require('../models/User');
const { mongoose } = require('../config/database');

exports.createMedication = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const medication = new Medication({ ...req.body, userId: req.userId });
    const medicationData = JSON.parse(JSON.stringify(medication));
    const user = await User.findOne({ _id: req.userId }).lean();
    await createMedicationSchedular({
      ...medicationData,
      userId: req.userId,
      userEmail: user.email,
      userName: user.name,
    });
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

exports.updateMedicineStatus = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid mongoose id');
    }
    await MedicationMetaData.findByIdAndUpdate(
      id,
      { status: 'done' },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ message: 'Success' });
  } catch (error) {
    next(error);
  }
};
