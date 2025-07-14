const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'business_directory',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// Import models
const User = require('./User')(sequelize);
const Business = require('./Business')(sequelize);
const Review = require('./Review')(sequelize);

// Define associations
User.hasMany(Business, { foreignKey: 'owner_id', as: 'businesses' });
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });

Business.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
Business.hasMany(Review, { foreignKey: 'business_id', as: 'reviews' });

Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Review.belongsTo(Business, { foreignKey: 'business_id', as: 'business' });

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database using Sequelize');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
  }
};

module.exports = {
  sequelize,
  User,
  Business,
  Review,
  testConnection
};
