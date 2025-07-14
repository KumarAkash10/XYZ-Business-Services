const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      isInt: true
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [0, 1000]
    }
  }
}, {
  tableName: 'reviews',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['business_id', 'user_id']
    },
    {
      fields: ['business_id']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['rating']
    }
  ],
  hooks: {
    afterCreate: async (review) => {
      // Update business rating after creating a review
      const business = await review.getBusiness();
      if (business) {
        await business.updateRating();
      }
    },
    afterUpdate: async (review) => {
      // Update business rating after updating a review
      const business = await review.getBusiness();
      if (business) {
        await business.updateRating();
      }
    },
    afterDestroy: async (review) => {
      // Update business rating after deleting a review
      const business = await review.getBusiness();
      if (business) {
        await business.updateRating();
      }
    }
  }
});

  // Scopes
  Review.addScope('byBusiness', (businessId) => ({
    where: {
      business_id: businessId
    }
  }));

  Review.addScope('byUser', (userId) => ({
    where: {
      user_id: userId
    }
  }));

  Review.addScope('byRating', (rating) => ({
    where: {
      rating: rating
    }
  }));

  return Review;
};
