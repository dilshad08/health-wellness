const express = require('express');
const { connectDB } = require('./config/database');
const errorHandler = require('./middlewares/errorMiddleware');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

require('./bull/weeklyReportQueue');

require('./bull/worker');

connectDB();
const app = express();
app.use(express.json());

app.use(helmet()); // Secure HTTP headers
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

const apiRoutes = require('./routes');
app.use('/api/v1', apiRoutes);

// Global Error Handler (MUST be the last middleware)
app.use(errorHandler);

module.exports = app;
