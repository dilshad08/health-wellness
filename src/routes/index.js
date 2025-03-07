const express = require('express');

const authRoutes = require('./authRoutes');
const medicationRoutes = require('./medicationRoutes');

const router = express.Router();

// Define sub-routes under the global `/api/v1` prefix
router.use('/auth', authRoutes);
router.use('/medications', medicationRoutes);

module.exports = router;
