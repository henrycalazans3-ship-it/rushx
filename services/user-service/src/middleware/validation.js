const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
  body('name').notEmpty().withMessage('Name is required'),
  body('userType').isIn(['client', 'biker']).withMessage('Invalid user type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Validation error',
          details: errors.array()
        }
      });
    }
    next();
  }
];

const validateLogin = [
  body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Validation error',
          details: errors.array()
        }
      });
    }
    next();
  }
];

module.exports = { validateRegister, validateLogin };
