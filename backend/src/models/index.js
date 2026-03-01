const Company = require('./company.model');
const Shareholder = require('./shareholder.model');

// Define associations
Company.hasMany(Shareholder, {
  foreignKey: 'companyId',
  as: 'shareholders',
  onDelete: 'CASCADE'
});

Shareholder.belongsTo(Company, {
  foreignKey: 'companyId',
  as: 'company'
});

module.exports = {
  Company,
  Shareholder
};