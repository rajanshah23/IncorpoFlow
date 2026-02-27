const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name',
    validate: {
      notEmpty: {
        msg: 'Company name is required'
      }
    }
  },
  numberOfShareholders: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'number_of_shareholders',
    validate: {
      notEmpty: {
        msg: 'Number of shareholders is required'
      },
      min: {
        args: [1],
        msg: 'At least 1 shareholder is required'
      }
    }
  },
  totalCapitalInvested: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    field: 'total_capital_invested',
    validate: {
      notEmpty: {
        msg: 'Total capital invested is required'
      },
      min: {
        args: [0],
        msg: 'Total capital cannot be negative'
      }
    }
  }
}, {
  tableName: 'companies',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true
});

module.exports = Company;