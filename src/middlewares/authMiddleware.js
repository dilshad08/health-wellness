const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token.js');
const User = require('../models/User');
require('dotenv').config();

exports.authenticateUser = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid token.' });
    }

    // Check if the token exists in the database (for added security)
    const tokenExists = await Token.findOne({ userId: decoded.userId, token });
    if (!tokenExists) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token is invalid or expired.' });
    }

    // Fetch user details and attach to request object
    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token is invalid or expired.' });
    }

    req.userId = decoded.userId;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token.', error: error.message });
  }
};
