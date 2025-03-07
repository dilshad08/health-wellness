const express = require('express');
const {
  createMedication,
  getMedications,
  deleteMedication,
  sendReminder,
} = require('../controllers/medicationController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validateAddMedicine } = require('../middlewares/validateMedication');
const router = express.Router();

router.post('/', validateAddMedicine, authenticateUser, createMedication);

module.exports = router;
