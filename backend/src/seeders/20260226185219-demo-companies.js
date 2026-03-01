'use strict';
const { v4: uuidv4 } = require('uuid');  // ✅ Correct import - uuidv4 is a function

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert demo companies with UUIDs for ALL records
    await queryInterface.bulkInsert('companies', [
      {
        id: uuidv4(),  // ✅ Call function to generate UUID
        name: 'Tech Innovations Inc',
        number_of_shareholders: 3,
        total_capital_invested: 1500000.00,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),  // ✅ Add missing ID
        name: 'Green Energy Solutions',
        number_of_shareholders: 2,
        total_capital_invested: 2750000.50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),  // ✅ Add missing ID
        name: 'Digital Marketing Agency',
        number_of_shareholders: 4,
        total_capital_invested: 500000.75,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),  // ✅ Add missing ID
        name: 'Global Trading LLC',
        number_of_shareholders: 5,
        total_capital_invested: 3200000.00,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),  // ✅ Add missing ID
        name: 'AI Research Labs',
        number_of_shareholders: 2,
        total_capital_invested: 5000000.00,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all companies  
    await queryInterface.bulkDelete('companies', null, {});
  }
};