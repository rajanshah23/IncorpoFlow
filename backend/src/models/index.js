const Company = require('./company.model');
const shareholder = require('./shareholder.model');

// Define associations
Company.hasMany(shareholder, {
  foreignKey: 'companyId',
  as: 'shareholders',
  onDelete: 'CASCADE'
});

shareholder.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'company'
});

module.exports = {
  Company,
  shareholder
};