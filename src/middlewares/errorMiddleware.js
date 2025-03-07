const { StatusCodes } = require('http-status-codes');
// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err);

  // Set Default Status Code
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  // Handle Specific Error Cases
  if (err.name === 'ValidationError') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid data input';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Access Denied: Unauthorized';
  }

  // Return JSON Error Response
  return res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
