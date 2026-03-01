const { body, param, validationResult } = require('express-validator');

// ========== COMPANY VALIDATIONS ==========
const validateCompany = [
  body('name')
    .notEmpty().withMessage('Company name is required')
    .isString().withMessage('Company name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters')
    .trim(),

  body('numberOfShareholders')
    .notEmpty().withMessage('Number of shareholders is required')
    .isInt({ min: 1, max: 100 }).withMessage('Number of shareholders must be between 1 and 100')
    .toInt(),

  body('totalCapitalInvested')
    .notEmpty().withMessage('Total capital invested is required')
    .isFloat({ min: 0 }).withMessage('Total capital invested must be a positive number')
    .toFloat(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

// ========== SHAREHOLDERS VALIDATION ==========
const validateShareholders = [
  body('shareholders')
    .isArray().withMessage('Shareholders must be an array')
    .notEmpty().withMessage('At least one shareholder is required'),

  body('shareholders.*.firstName')
    .notEmpty().withMessage('First name is required for each shareholder')
    .isString().withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .trim(),

  body('shareholders.*.lastName')
    .notEmpty().withMessage('Last name is required for each shareholder')
    .isString().withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .trim(),

  body('shareholders.*.nationality')
    .notEmpty().withMessage('Nationality is required for each shareholder')
    .isString().withMessage('Nationality must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('Nationality must be between 2 and 50 characters')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

// ========== PARAMETER VALIDATIONS ==========
const validateCompanyId = [
  param('id')
    .isUUID()
    .withMessage('Company ID must be a valid UUID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

const validateCompanyIdParam = [
  param('companyId')
    .isUUID()
    .withMessage('Company ID must be a valid UUID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = {
  validateCompany,
  validateShareholders,
  validateCompanyId,
  validateCompanyIdParam
};