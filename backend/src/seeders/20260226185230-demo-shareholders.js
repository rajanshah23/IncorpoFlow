'use strict';
const { v4: uuidv4 } = require('uuid');  // ✅ Correct import

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get the inserted companies to reference their IDs
    const companies = await queryInterface.sequelize.query(
      'SELECT id, name FROM companies;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Create a map of company names to their IDs
    const companyMap = {};
    companies.forEach(company => {
      companyMap[company.name] = company.id;
    });

    // Define shareholders for each company
    const shareholders = [];

    // Shareholders for Tech Innovations Inc
    if (companyMap['Tech Innovations Inc']) {
      shareholders.push(
        {
          id: uuidv4(),  // ✅ Generate UUID
          company_id: companyMap['Tech Innovations Inc'],
          first_name: 'Rajan',
          last_name: 'Gupta',
          nationality: 'Nepalese',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add missing ID
          company_id: companyMap['Tech Innovations Inc'],
          first_name: 'Anish',
          last_name: 'Gupta',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add missing ID
          company_id: companyMap['Tech Innovations Inc'],
          first_name: 'Raj',
          last_name: 'Patel',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        }
      );
    }

    // Shareholders for Green Energy Solutions
    if (companyMap['Green Energy Solutions']) {
      shareholders.push(
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Green Energy Solutions'],
          first_name: 'Emma',
          last_name: 'K.C.',
          nationality: 'Nepalese',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Green Energy Solutions'],
          first_name: 'Hansraj',
          last_name: 'pandey',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        }
      );
    }

    // Shareholders for Digital Marketing Agency
    if (companyMap['Digital Marketing Agency']) {
      shareholders.push(
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Digital Marketing Agency'],
          first_name: 'Alex',
          last_name: 'Martin',
          nationality: 'French',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Digital Marketing Agency'],
          first_name: 'merry',
          last_name: 'Rossi',
          nationality: 'Italian',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Digital Marketing Agency'],
          first_name: 'Yuzik',
          last_name: 'Tanaka',
          nationality: 'Japanese',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Digital Marketing Agency'],
          first_name: 'Carlos',
          last_name: 'Silva',
          nationality: 'Brazilian',
          created_at: new Date(),
          updated_at: new Date()
        }
      );
    }

    // Shareholders for Global Trading LLC
    if (companyMap['Global Trading LLC']) {
      shareholders.push(
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Global Trading LLC'],
          first_name: 'Michael',
          last_name: 'jain',
          nationality: 'Chinese',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Global Trading LLC'],
          first_name: 'Fatima',
          last_name: 'kadri',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Global Trading LLC'],
          first_name: 'prabin',
          last_name: 'Mohara',
          nationality: 'Nepalese',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Global Trading LLC'],
          first_name: 'suman',
          last_name: 'desoza',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['Global Trading LLC'],
          first_name: 'jenny',
          last_name: 'pora',
          nationality: 'Russian',
          created_at: new Date(),
          updated_at: new Date()
        }
      );
    }

    // Shareholders for AI Research Labs
    if (companyMap['AI Research Labs']) {
      shareholders.push(
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['AI Research Labs'],
          first_name: 'David',
          last_name: 'warner',
          nationality: 'South Africa',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuidv4(),  // ✅ Add ID
          company_id: companyMap['AI Research Labs'],
          first_name: 'Priya',
          last_name: 'Singh',
          nationality: 'Indian',
          created_at: new Date(),
          updated_at: new Date()
        }
      );
    }

    // Insert all shareholders
    if (shareholders.length > 0) {
      await queryInterface.bulkInsert('shareholders', shareholders, {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete all shareholders
    await queryInterface.bulkDelete('shareholders', null, {});
  }
};