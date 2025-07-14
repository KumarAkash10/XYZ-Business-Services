const express = require('express');
const router = express.Router();
const { Business } = require('../models');
const { Op } = require('sequelize');

// GET /api/businesses/categories - Get all available categories
router.get('/categories', async (req, res) => {
  try {
    // Fetch categories with business count
    const categories = await Business.findAll({
      attributes: [
        'category',
        [Business.sequelize.fn('COUNT', Business.sequelize.col('category')), 'count']
      ],
      where: {
        is_approved: true
      },
      group: ['category'],
      order: [
        [Business.sequelize.fn('COUNT', Business.sequelize.col('category')), 'DESC'],
        ['category', 'ASC']
      ]
    });

    // Format categories for frontend
    const formattedCategories = categories.map(category => ({
      value: category.category,
      label: category.category.charAt(0).toUpperCase() + category.category.slice(1),
      count: parseInt(category.dataValues.count)
    }));

    // Send successful response
    return res.status(200).json({
      success: true,
      data: formattedCategories,
      message: 'Categories fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching categories:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch categories',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/businesses/cities - Get all available cities
router.get('/cities', async (req, res) => {
  try {
    // Fetch cities with business count
    const cities = await Business.findAll({
      attributes: [
        'city',
        'state',
        [Business.sequelize.fn('COUNT', Business.sequelize.col('*')), 'count']
      ],
      where: {
        is_approved: true
      },
      group: ['city', 'state'],
      order: [
        [Business.sequelize.fn('COUNT', Business.sequelize.col('*')), 'DESC'],
        ['city', 'ASC']
      ]
    });

    // Format cities for frontend
    const formattedCities = cities.map(city => ({
      city: city.city,
      state: city.state,
      count: parseInt(city.dataValues.count),
      label: `${city.city}, ${city.state}`
    }));

    // Send successful response
    return res.status(200).json({
      success: true,
      data: formattedCities,
      message: 'Cities fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching cities:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch cities',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/businesses/featured - Get featured businesses
router.get('/featured', async (req, res) => {
  try {
    // Fetch featured and approved businesses
    const businesses = await Business.findAll({
      where: {
        is_featured: true,
        is_approved: true
      },
      order: [
        ['rating', 'DESC'],
        ['review_count', 'DESC'],
        ['created_at', 'DESC']
      ],
      limit: 10,
      attributes: [
        'id', 'name', 'description', 'category', 'address', 'city', 'state', 'zip_code',
        'phone', 'email', 'website', 'image_url', 'rating', 'review_count',
        'is_featured', 'is_approved', 'created_at', 'updated_at'
      ]
    });

    // Send successful response
    return res.status(200).json({
      success: true,
      data: businesses,
      count: businesses.length,
      message: 'Featured businesses fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching featured businesses:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch featured businesses',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/businesses - Get all businesses with optional filtering
router.get('/', async (req, res) => {
  try {
    // Extract query parameters with defaults
    const {
      category,
      city,
      search,
      featured,
      limit = 50,
      offset = 0,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    // Validate pagination parameters
    const parsedLimit = Math.min(parseInt(limit) || 50, 100); // Max 100 items
    const parsedOffset = Math.max(parseInt(offset) || 0, 0);

    // Build where conditions for filtering
    const whereConditions = {
      is_approved: true
    };

    // Apply category filter
    if (category && category !== 'all') {
      whereConditions.category = category;
    }

    // Apply city filter (case-insensitive)
    if (city) {
      whereConditions.city = {
        [Op.iLike]: city
      };
    }

    // Apply search filter (searches in name and description)
    if (search) {
      whereConditions[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          description: {
            [Op.iLike]: `%${search}%`
          }
        }
      ];
    }

    // Apply featured filter
    if (featured === 'true') {
      whereConditions.is_featured = true;
    }

    // Build and validate order conditions
    const validSortFields = ['name', 'rating', 'review_count', 'created_at'];
    const validOrders = ['ASC', 'DESC'];

    let orderConditions = [['created_at', 'DESC']]; // Default order
    if (validSortFields.includes(sort) && validOrders.includes(order.toUpperCase())) {
      orderConditions = [[sort, order.toUpperCase()]];
    }

    // Execute database queries
    const [businesses, totalCount] = await Promise.all([
      // Fetch businesses with filters and pagination
      Business.findAll({
        where: whereConditions,
        order: orderConditions,
        limit: parsedLimit,
        offset: parsedOffset,
        attributes: [
          'id', 'name', 'description', 'category', 'address', 'city', 'state', 'zip_code',
          'phone', 'email', 'website', 'image_url', 'rating', 'review_count',
          'is_featured', 'is_approved', 'created_at', 'updated_at'
        ]
      }),

      // Get total count for pagination
      Business.count({
        where: whereConditions
      })
    ]);

    // Calculate pagination info
    const hasMore = parsedOffset + parsedLimit < totalCount;
    const totalPages = Math.ceil(totalCount / parsedLimit);
    const currentPage = Math.floor(parsedOffset / parsedLimit) + 1;

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        businesses: businesses,
        pagination: {
          total: totalCount,
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: hasMore,
          totalPages: totalPages,
          currentPage: currentPage
        }
      },
      message: 'Businesses fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching businesses:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch businesses',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/businesses/:id - Get a specific business
router.get('/:id', async (req, res) => {
  try {
    // Extract and validate business ID
    const { id } = req.params;

    // Validate ID format (should be a number)
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Invalid business ID format'
      });
    }

    // Fetch business from database
    const business = await Business.findOne({
      where: {
        id: parseInt(id),
        is_approved: true
      },
      attributes: [
        'id', 'name', 'description', 'category', 'address', 'city', 'state', 'zip_code',
        'phone', 'email', 'website', 'image_url', 'rating', 'review_count',
        'is_featured', 'is_approved', 'created_at', 'updated_at'
      ]
    });

    // Check if business exists
    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Business not found or not approved'
      });
    }

    // Send successful response
    return res.status(200).json({
      success: true,
      data: business,
      message: 'Business fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching business:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to fetch business',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/businesses - Create a new business
router.post('/', async (req, res) => {
  try {
    // Extract business data from request body
    const {
      name,
      description,
      category,
      address,
      city,
      state,
      zip_code,
      phone,
      email,
      website,
      image_url
    } = req.body;

    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'address', 'city', 'state', 'zip_code', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Business name must be between 2 and 100 characters'
      });
    }

    if (description.length < 10 || description.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Description must be between 10 and 1000 characters'
      });
    }

    // Check if business with same name and address already exists
    const existingBusiness = await Business.findOne({
      where: {
        name: {
          [Op.iLike]: name.trim()
        },
        address: {
          [Op.iLike]: address.trim()
        }
      }
    });

    if (existingBusiness) {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'A business with this name and address already exists'
      });
    }

    // Create new business in database
    const newBusiness = await Business.create({
      name: name.trim(),
      description: description.trim(),
      category: category.trim().toLowerCase(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zip_code: zip_code.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      website: website ? website.trim() : null,
      image_url: image_url ? image_url.trim() : null,
      is_approved: true, // Auto-approve for development
      is_featured: false,
      rating: 0,
      review_count: 0
    });

    // Send successful response
    return res.status(201).json({
      success: true,
      data: {
        business: newBusiness
      },
      message: 'Business registered successfully and is now live on the platform!'
    });

  } catch (error) {
    console.error('Error creating business:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Business data validation failed',
        validationErrors: validationErrors
      });
    }

    // Handle Sequelize unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'A business with this information already exists'
      });
    }

    // Handle database connection errors
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        success: false,
        error: 'Service Unavailable',
        message: 'Database connection error. Please try again later.'
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to create business',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
