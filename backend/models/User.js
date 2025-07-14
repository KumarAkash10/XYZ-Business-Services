const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  user_type: {
    type: DataTypes.ENUM('customer', 'business'),
    defaultValue: 'customer',
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ],
  hooks: {
    beforeValidate: (user) => {
      if (user.email) {
        user.email = user.email.toLowerCase();
      }
    }
  }
});

  // Instance methods
  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password_hash;
    return values;
  };

  return User;
};
