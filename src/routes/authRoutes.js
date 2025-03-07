const express = require('express');
const {
  register,
  login,
  logout,
  logoutAllDevices,
  logoutOtherDevices,
} = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const {
  validateCreateUser,
  validateLoginUser,
} = require('../middlewares/validateAuth');
const router = express.Router();

router.post('/register', validateCreateUser, register);
router.post('/login', validateLoginUser, login);
router.post('/logout', authenticateUser, logout);
router.post('/logout-all', authenticateUser, logoutAllDevices);
router.post('/logout-other', authenticateUser, logoutOtherDevices);

module.exports = router;
