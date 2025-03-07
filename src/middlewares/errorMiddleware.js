const { StatusCodes } = require('http-status-codes');
// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err);

  // Set Default Status Code
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  // Return JSON Error Response
  return res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
