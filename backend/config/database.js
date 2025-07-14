// Import the models with associations
const { sequelize, User, Business, Review, testConnection } = require('../models');

// Database initialization function
const initializeDatabase = async () => {
  try {
    // Test connection
    await testConnection();

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized');

    // Insert sample data
    await insertSampleData(Business);

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
};

// Insert sample business data
const insertSampleData = async (Business) => {
  try {
    // Check if sample data already exists
    const businessCount = await Business.count();

    if (businessCount > 0) {
      console.log('Sample data already exists, skipping insertion');
      return;
    }

    const sampleBusinesses = [
      {
        name: 'Spice Garden Restaurant',
        description: 'Authentic Indian cuisine with traditional flavors and modern presentation. Family-owned restaurant serving delicious curries, biryanis, and tandoor specialties.',
        category: 'restaurant',
        address: '123 Food Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip_code: '400001',
        phone: '+91 22 1234 5678',
        email: 'info@spicegarden.com',
        website: 'https://spicegarden.com',
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        rating: 4.5,
        review_count: 127,
        is_featured: true,
        is_approved: true
      },
      {
        name: 'TechSolutions Pro',
        description: 'Leading IT consulting and software development company specializing in web applications, mobile apps, and digital transformation solutions.',
        category: 'technology',
        address: '456 Tech Park',
        city: 'Bangalore',
        state: 'Karnataka',
        zip_code: '560001',
        phone: '+91 80 9876 5432',
        email: 'contact@techsolutions.com',
        website: 'https://techsolutions.com',
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        rating: 4.8,
        review_count: 89,
        is_featured: true,
        is_approved: true
      },
      {
        name: 'Green Valley Healthcare',
        description: 'Comprehensive healthcare services with experienced doctors and modern facilities. Specializing in family medicine, pediatrics, and preventive care.',
        category: 'healthcare',
        address: '789 Health Avenue',
        city: 'Delhi',
        state: 'Delhi',
        zip_code: '110001',
        phone: '+91 11 5555 6666',
        email: 'info@greenvalley.com',
        website: 'https://greenvalley.com',
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500',
        rating: 4.3,
        review_count: 203,
        is_featured: false,
        is_approved: true
      },
      {
        name: 'Fashion Hub Boutique',
        description: 'Trendy fashion boutique offering the latest in women\'s and men\'s clothing, accessories, and footwear from top brands and emerging designers.',
        category: 'retail',
        address: '321 Fashion Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip_code: '400002',
        phone: '+91 22 7777 8888',
        email: 'hello@fashionhub.com',
        website: 'https://fashionhub.com',
        image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
        rating: 4.2,
        review_count: 156,
        is_featured: false,
        is_approved: true
      },
      {
        name: 'AutoCare Service Center',
        description: 'Professional automotive repair and maintenance services. Expert technicians, genuine parts, and comprehensive car care solutions.',
        category: 'automotive',
        address: '654 Service Road',
        city: 'Chennai',
        state: 'Tamil Nadu',
        zip_code: '600001',
        phone: '+91 44 3333 4444',
        email: 'service@autocare.com',
        website: 'https://autocare.com',
        image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500',
        rating: 4.6,
        review_count: 94,
        is_featured: true,
        is_approved: true
      }
    ];

    // Use Sequelize bulkCreate to insert sample data
    await Business.bulkCreate(sampleBusinesses);

    console.log('Sample data inserted successfully');
  } catch (err) {
    console.error('Error inserting sample data:', err);
  }
};

module.exports = {
  sequelize,
  initializeDatabase
};
