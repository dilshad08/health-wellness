const Medication = require('../models/Medication');
const { StatusCodes } = require('http-status-codes');

exports.createMedication = async (req, res, next) => {
  try {
    const medication = new Medication({ ...req.body, userId: req.userId });
    await medication.save();
    res.status(StatusCodes.CREATED).json({ data: medication });
  } catch (error) {
    next(error);
  }
};
