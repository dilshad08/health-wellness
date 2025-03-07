const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

// Custom validation for time format (HH:mm)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

exports.validateAddMedicine = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.base': '"name" should be a string',
      'string.empty': '"name" cannot be empty',
      'string.min': '"name" must be at least 3 characters long',
      'string.max': '"name" must be at most 50 characters long',
      'any.required': '"name" is required',
    }),
    description: Joi.string().max(255).optional().messages({
      'string.max': '"description" must be at most 255 characters long',
    }),
    scheduleType: Joi.string()
      .valid('daily', 'weekly', 'onetime')
      .required()
      .messages({
        'any.only':
          '"scheduleType" must be either "daily", "weekly", or "onetime"',
        'any.required': '"scheduleType" is required',
      }),
    time: Joi.string().pattern(timeRegex).required().messages({
      'string.pattern.base': '"time" must be in HH:mm format (e.g., 14:30)',
      'any.required': '"time" is required',
    }),
    dayOfWeek: Joi.string()
      .valid(
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      )
      .required()
      .messages({
        'any.only':
          '"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"',
        'any.required': '"dayOfWeek" is required',
      }),
    startDate: Joi.date().iso().optional().messages({
      'date.base': '"startDate" must be a valid date',
      'date.format': '"startDate" must be in YYYY-MM-DD format',
      'any.required': '"startDate" is required',
    }),
    endDate: Joi.date()
      .iso()
      .greater(Joi.ref('startDate'))
      .optional()
      .messages({
        'date.base': '"endDate" must be a valid date',
        'date.format': '"endDate" must be in YYYY-MM-DD format',
        'date.greater': '"endDate" must be after "startDate"',
      }),
  });

  // Validate the request body
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.details.map((detail) => detail.message).join(', '),
    });
  }
  next();
};
