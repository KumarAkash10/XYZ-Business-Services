const { errorResponse } = require('../utils/responseHelper');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    return errorResponse(res, 'Validation failed', 400, errors);
  }

  // Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return errorResponse(res, 'Duplicate entry', 409, 'Resource already exists');
  }

  // Sequelize foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return errorResponse(res, 'Invalid reference', 400, 'Referenced resource does not exist');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return errorResponse(res, 'File too large', 400, 'Maximum file size exceeded');
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return errorResponse(res, 'Too many files', 400, 'Maximum file count exceeded');
  }

  // Custom application errors
  if (err.statusCode) {
    return errorResponse(res, err.message, err.statusCode, err.details);
  }

  // Default server error
  return errorResponse(res, 'Internal server error', 500, 
    process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  );
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  return errorResponse(res, 'Route not found', 404, `Cannot ${req.method} ${req.originalUrl}`);
};

/**
 * Async error wrapper
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom error class
 */
class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  AppError
};
