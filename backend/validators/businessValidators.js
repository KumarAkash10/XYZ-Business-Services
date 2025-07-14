const { body, param, query } = require('express-validator');

/**
 * Validation for business creation
 */
const validateCreateBusiness = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Business name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Business name must be between 2 and 255 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Business description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Business description must be between 10 and 2000 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Business category is required')
    .isIn(['restaurant', 'retail', 'healthcare', 'education', 'technology', 'finance', 'automotive', 'beauty', 'home', 'professional'])
    .withMessage('Invalid business category'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Business address is required')
    .isLength({ min: 5, max: 500 })
    .withMessage('Business address must be between 5 and 500 characters'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('City can only contain letters and spaces'),

  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('State must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('State can only contain letters and spaces'),

  body('zip_code')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('ZIP code must be between 3 and 20 characters')
    .matches(/^[0-9A-Za-z\s-]+$/)
    .withMessage('Invalid ZIP code format'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[0-9\s\-\(\)]{10,20}$/)
    .withMessage('Invalid phone number format'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Business email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('website')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid website URL')
    .isLength({ max: 255 })
    .withMessage('Website URL must not exceed 255 characters'),

  body('image_url')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid image URL')
    .isLength({ max: 500 })
    .withMessage('Image URL must not exceed 500 characters')
];

/**
 * Validation for business update
 */
const validateUpdateBusiness = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid business ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Business name must be between 2 and 255 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Business description must be between 10 and 2000 characters'),

  body('category')
    .optional()
    .trim()
    .isIn(['restaurant', 'retail', 'healthcare', 'education', 'technology', 'finance', 'automotive', 'beauty', 'home', 'professional'])
    .withMessage('Invalid business category'),

  body('address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Business address must be between 5 and 500 characters'),

  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('City can only contain letters and spaces'),

  body('state')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('State must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('State can only contain letters and spaces'),

  body('zip_code')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('ZIP code must be between 3 and 20 characters')
    .matches(/^[0-9A-Za-z\s-]+$/)
    .withMessage('Invalid ZIP code format'),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,20}$/)
    .withMessage('Invalid phone number format'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('website')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid website URL')
    .isLength({ max: 255 })
    .withMessage('Website URL must not exceed 255 characters'),

  body('image_url')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid image URL')
    .isLength({ max: 500 })
    .withMessage('Image URL must not exceed 500 characters')
];

/**
 * Validation for getting business by ID
 */
const validateGetBusiness = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid business ID')
];

/**
 * Validation for business query parameters
 */
const validateBusinessQuery = [
  query('category')
    .optional()
    .trim()
    .isIn(['all', 'restaurant', 'retail', 'healthcare', 'education', 'technology', 'finance', 'automotive', 'beauty', 'home', 'professional'])
    .withMessage('Invalid category filter'),

  query('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('City filter must be between 2 and 100 characters'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),

  query('featured')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('Featured filter must be true or false'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),

  query('sort')
    .optional()
    .isIn(['name', 'rating', 'review_count', 'created_at'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc'])
    .withMessage('Order must be ASC or DESC')
];

/**
 * Validation for deleting business
 */
const validateDeleteBusiness = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid business ID')
];

module.exports = {
  validateCreateBusiness,
  validateUpdateBusiness,
  validateGetBusiness,
  validateBusinessQuery,
  validateDeleteBusiness
};
