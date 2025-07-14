const { body, param, query } = require('express-validator');

/**
 * Validation for updating user profile
 */
const validateUpdateProfile = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces')
];

/**
 * Validation for deleting user account
 */
const validateDeleteAccount = [
  body('password')
    .notEmpty()
    .withMessage('Password is required to delete account')
];

/**
 * Validation for user preferences
 */
const validateUpdatePreferences = [
  body('notifications')
    .optional()
    .isObject()
    .withMessage('Notifications must be an object'),

  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications setting must be boolean'),

  body('notifications.sms')
    .optional()
    .isBoolean()
    .withMessage('SMS notifications setting must be boolean'),

  body('notifications.marketing')
    .optional()
    .isBoolean()
    .withMessage('Marketing notifications setting must be boolean'),

  body('privacy')
    .optional()
    .isObject()
    .withMessage('Privacy must be an object'),

  body('privacy.profileVisible')
    .optional()
    .isBoolean()
    .withMessage('Profile visibility setting must be boolean'),

  body('privacy.showEmail')
    .optional()
    .isBoolean()
    .withMessage('Show email setting must be boolean'),

  body('language')
    .optional()
    .isIn(['en', 'hi', 'es', 'fr'])
    .withMessage('Invalid language selection'),

  body('timezone')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Invalid timezone')
];

/**
 * Validation for user reviews query
 */
const validateUserReviewsQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

/**
 * Validation for getting user by ID (admin only)
 */
const validateGetUser = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid user ID')
];

/**
 * Validation for user list query (admin only)
 */
const validateUserListQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('userType')
    .optional()
    .isIn(['customer', 'business', 'admin'])
    .withMessage('Invalid user type filter'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),

  query('sort')
    .optional()
    .isIn(['first_name', 'last_name', 'email', 'created_at'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc'])
    .withMessage('Order must be ASC or DESC')
];

/**
 * Validation for updating user status (admin only)
 */
const validateUpdateUserStatus = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid user ID'),

  body('isVerified')
    .optional()
    .isBoolean()
    .withMessage('Verification status must be boolean'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Active status must be boolean'),

  body('userType')
    .optional()
    .isIn(['customer', 'business', 'admin'])
    .withMessage('Invalid user type')
];

module.exports = {
  validateUpdateProfile,
  validateDeleteAccount,
  validateUpdatePreferences,
  validateUserReviewsQuery,
  validateGetUser,
  validateUserListQuery,
  validateUpdateUserStatus
};
