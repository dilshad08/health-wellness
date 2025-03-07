const express = require('express');
const {
  createMedication,
  updateMedicineStatus,
} = require('../controllers/medicationController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validateAddMedicine } = require('../middlewares/validateMedication');
const router = express.Router();

router.post('/', validateAddMedicine, authenticateUser, createMedication);
router.get('/update', authenticateUser, updateMedicineStatus);

module.exports = router;
