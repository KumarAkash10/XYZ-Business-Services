const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 2000]
    }
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['restaurant', 'retail', 'healthcare', 'education', 'technology', 'finance', 'automotive', 'beauty', 'home', 'professional']]
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  zip_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 20]
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 20]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0
    }
  },
  review_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'businesses',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['category']
    },
    {
      fields: ['city']
    },
    {
      fields: ['is_approved']
    },
    {
      fields: ['is_featured']
    },
    {
      fields: ['owner_id']
    }
  ],
  hooks: {
    beforeValidate: (business) => {
      if (business.email) {
        business.email = business.email.toLowerCase();
      }
      if (business.category) {
        business.category = business.category.toLowerCase();
      }
    }
  }
});

  // Instance methods
  Business.prototype.updateRating = async function() {
    const reviews = await this.getReviews();
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      this.rating = (totalRating / reviews.length).toFixed(1);
      this.review_count = reviews.length;
      await this.save();
    }
  };

  // Scopes
  Business.addScope('approved', {
    where: {
      is_approved: true
    }
  });

  Business.addScope('featured', {
    where: {
      is_featured: true,
      is_approved: true
    }
  });

  Business.addScope('byCategory', (category) => ({
    where: {
      category: category,
      is_approved: true
    }
  }));

  Business.addScope('byCity', (city) => ({
    where: {
      city: city,
      is_approved: true
    }
  }));

  return Business;
};
