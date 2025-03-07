const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

// Define the Joi validation schema for the request body
exports.validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'string.base': '"name" should be a type of string',
      'string.empty': '"name" cannot be an empty field',
      'string.min': '"name" should have a minimum length of 3 characters',
      'string.max': '"name" should have a maximum length of 30 characters',
      'any.required': '"name" is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': '"email" should be a type of string',
      'string.empty': '"email" cannot be an empty field',
      'string.email': '"email" must be a valid email address',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).max(20).required().messages({
      'string.base': '"password" should be a type of string',
      'string.empty': '"password" cannot be an empty field',
      'string.min': '"password" should have a minimum length of 6 characters',
      'string.max': '"password" should have a maximum length of 20 characters',
      'any.required': '"password" is required',
    }),
  });

  // Validate the request body
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.details.map((detail) => detail.message).join(', '),
    });
  }
  next();
};

exports.validateLoginUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': '"email" should be a type of string',
      'string.empty': '"email" cannot be an empty field',
      'string.email': '"email" must be a valid email address',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).max(20).required().messages({
      'string.base': '"password" should be a type of string',
      'string.empty': '"password" cannot be an empty field',
      'string.min': '"password" should have a minimum length of 6 characters',
      'string.max': '"password" should have a maximum length of 20 characters',
      'any.required': '"password" is required',
    }),
  });

  // Validate the request body
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.details.map((detail) => detail.message).join(', '),
    });
  }
  next();
};
