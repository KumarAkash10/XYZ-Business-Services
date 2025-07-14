/**
 * Standard success response format
 */
const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Standard error response format
 */
const errorResponse = (res, message, statusCode = 500, details = null) => {
  const response = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };

  if (details !== null) {
    response.details = details;
  }

  return res.status(statusCode).json(response);
};

/**
 * Paginated response format
 */
const paginatedResponse = (res, message, data, pagination, statusCode = 200) => {
  const response = {
    success: true,
    message,
    data,
    pagination: {
      total: pagination.total,
      page: pagination.page || Math.floor(pagination.offset / pagination.limit) + 1,
      limit: pagination.limit,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasMore: pagination.hasMore
    },
    timestamp: new Date().toISOString()
  };

  return res.status(statusCode).json(response);
};

/**
 * Validation error response format
 */
const validationErrorResponse = (res, errors) => {
  const formattedErrors = errors.map(error => ({
    field: error.param || error.path,
    message: error.msg || error.message,
    value: error.value
  }));

  return errorResponse(res, 'Validation failed', 400, formattedErrors);
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
  validationErrorResponse
};
