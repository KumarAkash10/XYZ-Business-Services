const express = require('express');
const router = express.Router();

// Import controllers
const reviewController = require('../controllers/reviewController');

// Import middleware
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { generalLimiter } = require('../middleware/rateLimiter');

// Import validators
const {
  validateCreateReview,
  validateUpdateReview,
  validateGetReview,
  validateGetBusinessReviews,
  validateDeleteReview,
  validateReportReview,
  validateGetReviewStats,
  validateUserReviewsQuery,
  validateToggleReviewLike
} = require('../validators/reviewValidators');

// POST /api/reviews - Create a new review
router.post('/',
  generalLimiter,
  authenticateToken,
  validateCreateReview,
  reviewController.createReview
);

// GET /api/reviews/:id - Get review by ID
router.get('/:id',
  validateGetReview,
  optionalAuth,
  reviewController.getReviewById
);

// PUT /api/reviews/:id - Update a review
router.put('/:id',
  authenticateToken,
  validateUpdateReview,
  reviewController.updateReview
);

// DELETE /api/reviews/:id - Delete a review
router.delete('/:id',
  authenticateToken,
  validateDeleteReview,
  reviewController.deleteReview
);

// GET /api/reviews/business/:businessId - Get reviews for a business
router.get('/business/:businessId',
  validateGetBusinessReviews,
  optionalAuth,
  reviewController.getBusinessReviews
);

// GET /api/reviews/business/:businessId/stats - Get review statistics for a business
router.get('/business/:businessId/stats',
  validateGetReviewStats,
  reviewController.getReviewStats
);

// GET /api/reviews/user/my-reviews - Get current user's reviews
router.get('/user/my-reviews',
  authenticateToken,
  validateUserReviewsQuery,
  reviewController.getUserReviews
);

// POST /api/reviews/:id/report - Report a review
router.post('/:id/report',
  authenticateToken,
  validateReportReview,
  reviewController.reportReview
);

// POST /api/reviews/:id/like - Toggle like on a review
router.post('/:id/like',
  authenticateToken,
  validateToggleReviewLike,
  reviewController.toggleReviewLike
);

module.exports = router;
