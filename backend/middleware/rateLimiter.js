const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/responseHelper');

/**
 * General API rate limiter
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    return errorResponse(res, 'Too many requests', 429, 'Too many requests from this IP, please try again later.');
  }
});

/**
 * Strict rate limiter for auth endpoints
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts',
    message: 'Too many authentication attempts from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many authentication attempts', 429, 'Too many authentication attempts from this IP, please try again later.');
  }
});

/**
 * Rate limiter for business creation
 */
const businessCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 business creation requests per hour
  message: {
    error: 'Too many business creation attempts',
    message: 'Too many business creation attempts from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many business creation attempts', 429, 'Too many business creation attempts from this IP, please try again later.');
  }
});

/**
 * Rate limiter for search endpoints
 */
const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 search requests per minute
  message: {
    error: 'Too many search requests',
    message: 'Too many search requests from this IP, please try again later.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many search requests', 429, 'Too many search requests from this IP, please try again later.');
  }
});

/**
 * Rate limiter for password reset
 */
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    error: 'Too many password reset attempts',
    message: 'Too many password reset attempts from this IP, please try again later.',
    retryAfter: '1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many password reset attempts', 429, 'Too many password reset attempts from this IP, please try again later.');
  }
});

module.exports = {
  generalLimiter,
  authLimiter,
  businessCreationLimiter,
  searchLimiter,
  passwordResetLimiter
};
