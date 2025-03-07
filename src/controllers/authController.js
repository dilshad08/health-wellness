const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token.js');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    await new Token({ userId: user._id, token }).save();
    delete user.password;

    res.status(StatusCodes.OK).json({ token, data: user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await Token.deleteOne({ token: req.token });
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

exports.logoutAllDevices = async (req, res, next) => {
  try {
    await Token.deleteMany({ userId: req.userId });
    res.status(StatusCodes.OK).json({ message: 'Logged out from all devices' });
  } catch (error) {
    next(error);
  }
};

exports.logoutOtherDevices = async (req, res, next) => {
  try {
    await Token.deleteMany({ userId: req.userId, token: { $ne: req.token } });
    res
      .status(StatusCodes.OK)
      .json({ message: 'Logged out from other devices' });
  } catch (error) {
    next(error);
  }
};
