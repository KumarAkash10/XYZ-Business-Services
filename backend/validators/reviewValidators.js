const { body, param, query } = require('express-validator');

/**
 * Validation for creating a review
 */
const validateCreateReview = [
  body('business_id')
    .isInt({ min: 1 })
    .withMessage('Valid business ID is required'),

  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('comment')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters')
    .escape()
];

/**
 * Validation for updating a review
 */
const validateUpdateReview = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid review ID is required'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),

  body('comment')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters')
    .escape()
];

/**
 * Validation for getting a review by ID
 */
const validateGetReview = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid review ID is required')
];

/**
 * Validation for getting business reviews
 */
const validateGetBusinessReviews = [
  param('businessId')
    .isInt({ min: 1 })
    .withMessage('Valid business ID is required'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),

  query('sortBy')
    .optional()
    .isIn(['created_at', 'rating', 'updated_at'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc'])
    .withMessage('Order must be ASC or DESC')
];

/**
 * Validation for deleting a review
 */
const validateDeleteReview = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid review ID is required')
];

/**
 * Validation for reporting a review
 */
const validateReportReview = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid review ID is required'),

  body('reason')
    .notEmpty()
    .withMessage('Report reason is required')
    .isIn(['spam', 'inappropriate', 'fake', 'offensive', 'other'])
    .withMessage('Invalid report reason'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters')
    .escape()
];

/**
 * Validation for review statistics
 */
const validateGetReviewStats = [
  param('businessId')
    .isInt({ min: 1 })
    .withMessage('Valid business ID is required')
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
 * Validation for review like toggle
 */
const validateToggleReviewLike = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Valid review ID is required')
];

module.exports = {
  validateCreateReview,
  validateUpdateReview,
  validateGetReview,
  validateGetBusinessReviews,
  validateDeleteReview,
  validateReportReview,
  validateGetReviewStats,
  validateUserReviewsQuery,
  validateToggleReviewLike
};
