const { Company, Shareholder } = require('../models');
const { ValidationError } = require('sequelize');

console.log('Company model loaded:', !!Company);
console.log('Shareholder model loaded:', !!Shareholder);
console.log('Shareholder prototype:', Shareholder ? Object.getPrototypeOf(Shareholder).name : 'undefined');


const companyController = {
  // ========== CREATE COMPANY (Step 1) ==========
  async createCompany(req, res) {
    try {
      const { name, numberOfShareholders, totalCapitalInvested } = req.body;

      const company = await Company.create({
        name,
        numberOfShareholders,
        totalCapitalInvested
      });

      return res.status(201).json({
        success: true,
        message: 'Company draft saved successfully',
        data: {
          id: company.id,
          name: company.name,
          numberOfShareholders: company.numberOfShareholders,
          totalCapitalInvested: parseFloat(company.totalCapitalInvested),
          createdAt: company.created_at,
          updatedAt: company.updated_at
        }
      });
    } catch (error) {
      console.error('Error creating company:', error);

      if (error instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // ========== GET ALL COMPANIES WITH SHAREHOLDERS (Admin View) ==========
  async getAllCompanies(req, res) {
    try {
      const companies = await Company.findAll({
        include: [
          {
      association: 'shareholders', 
      attributes: ['id', 'firstName', 'lastName', 'nationality']
    }
        ],
        order: [['created_at', 'DESC']]
      });

      // Format the response
      const formattedCompanies = companies.map(company => {
        // Convert to plain object to safely access properties
        const companyData = company.get({ plain: true });
        
        return {
          id: companyData.id,
          name: companyData.name,
          numberOfShareholders: companyData.numberOfShareholders,
          totalCapitalInvested: parseFloat(companyData.totalCapitalInvested),
          shareholders: companyData.shareholders ? companyData.shareholders.map(s => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            nationality: s.nationality
          })) : [], // Handle case when there are no shareholders
          createdAt: companyData.created_at,
          updatedAt: companyData.updated_at
        };
      });

      return res.status(200).json({
        success: true,
        count: formattedCompanies.length,
        data: formattedCompanies
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message // Optional: include for debugging
      });
    }
  },

  // ========== GET SINGLE COMPANY WITH SHAREHOLDERS ==========
  async getOneCompany(req, res) {
    try {
      const { id } = req.params;

      const company = await Company.findByPk(id, {
        include: [
        {
      association: 'shareholders',
      attributes: ['id', 'firstName', 'lastName', 'nationality']
        }
          
        ]
      });

      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found'
        });
      }

      // Convert to plain object
      const companyData = company.get({ plain: true });

      return res.status(200).json({
        success: true,
        data: {
          id: companyData.id,
          name: companyData.name,
          numberOfShareholders: companyData.numberOfShareholders,
          totalCapitalInvested: parseFloat(companyData.totalCapitalInvested),
          shareholders: companyData.shareholders ? companyData.shareholders.map(s => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            nationality: s.nationality
          })) : [],
          createdAt: companyData.created_at,
          updatedAt: companyData.updated_at
        }
      });
    } catch (error) {
      console.error('Error fetching company:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // ========== ADD SHAREHOLDERS TO COMPANY (Step 2) ==========
  async addShareholders(req, res) {
    try {
      const { companyId } = req.params;
      const { shareholders } = req.body;

      // Check if company exists
      const company = await Company.findByPk(companyId);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found'
        });
      }

      // Validate number of shareholders matches company record
      if (shareholders.length !== company.numberOfShareholders) {
        return res.status(400).json({
          success: false,
          message: `Expected ${company.numberOfShareholders} shareholders but received ${shareholders.length}`
        });
      }

      // Check if shareholders already exist for this company
      const existingCount = await Shareholder.count({
        where: { companyId }
      });

      if (existingCount > 0) {
        return res.status(400).json({
          success: false,
          message: 'Shareholders already exist for this company'
        });
      }

      // Create shareholders
      const shareholderData = shareholders.map(s => ({
        companyId,
        firstName: s.firstName,
        lastName: s.lastName,
        nationality: s.nationality
      }));

      const createdShareholders = await Shareholder.bulkCreate(shareholderData);

      return res.status(201).json({
        success: true,
        message: 'Shareholders added successfully',
        data: createdShareholders.map(s => ({
          id: s.id,
          firstName: s.firstName,
          lastName: s.lastName,
          nationality: s.nationality
        }))
      });
    } catch (error) {
      console.error('Error adding shareholders:', error);

      if (error instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // ========== UPDATE COMPANY DRAFT ==========
  async updateCompany(req, res) {
    try {
      const { id } = req.params;
      const { name, numberOfShareholders, totalCapitalInvested } = req.body;

      const company = await Company.findByPk(id);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found'
        });
      }

      await company.update({
        name,
        numberOfShareholders,
        totalCapitalInvested
      });

      return res.status(200).json({
        success: true,
        message: 'Company updated successfully',
        data: {
          id: company.id,
          name: company.name,
          numberOfShareholders: company.numberOfShareholders,
          totalCapitalInvested: parseFloat(company.totalCapitalInvested)
        }
      });
    } catch (error) {
      console.error('Error updating company:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // ========== DELETE COMPANY ==========
async deleteCompany(req, res) {
  try {
    const { id } = req.params;

    // Find the company first
    const company = await Company.findByPk(id);

    // Check if company exists
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Check if company has shareholders
    const shareholderCount = await Shareholder.count({
      where: { companyId: id }
    });

    if (shareholderCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete company with existing shareholders. Please delete shareholders first.'
      });
    }

    // Delete the company
    await company.destroy();

    return res.status(200).json({
      success: true,
      message: 'Company deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting company:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
},
// ========= DELETE ALL SHAREHOLDERS OF A COMPANY ==========
async deleteAllShareholders(req, res) {
  try {
    const { companyId } = req.params;

    // Check if company exists
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Count how many shareholders will be deleted
    const count = await Shareholder.count({
      where: { companyId }
    });

    if (count === 0) {
      return res.status(400).json({
        success: false,
        message: 'No shareholders found for this company'
      });
    }

    // Delete all shareholders of this company
    await Shareholder.destroy({
      where: { companyId }
    });

    return res.status(200).json({
      success: true,
      message: `${count} shareholders deleted successfully from ${company.name}`
    });

  } catch (error) {
    console.error('Error deleting all shareholders:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
},
// ========== DELETE COMPANY WITH CASCADE ==========
async deleteCompanyWithShareholders(req, res) {
  try {
    const { id } = req.params;

    // Find the company
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Get count of shareholders before deletion (for response message)
    const shareholderCount = await Shareholder.count({
      where: { companyId: id }
    });

    // Delete the company - shareholders will be auto-deleted due to CASCADE
    await company.destroy();

    return res.status(200).json({
      success: true,
      message: `Company deleted successfully along with ${shareholderCount} shareholders`
    });

  } catch (error) {
    console.error('Error deleting company:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
};

module.exports = companyController;