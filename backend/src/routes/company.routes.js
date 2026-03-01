const express = require('express');
const router = express.Router();

const {
  validateCompany,
  validateShareholders,
  validateCompanyId,
  validateCompanyIdParam
} = require('../middlewares/validation');
const companyController = require('../controllers/company.controllers');

// ========== COMPANY ROUTES ==========

/**
 * @route   POST /api/companies
 * @desc    Create a new company (Step 1)
 * @access  Public
 */
router.post('/', validateCompany, companyController.createCompany);

/**
 * @route   GET /api/companies
 * @desc    Get all companies with shareholders (Admin View)
 * @access  Public
 */
router.get('/', companyController.getAllCompanies);

/**
 * @route   GET /api/companies/:id
 * @desc    Get single company by ID
 * @access  Public
 */
router.get('/:id', validateCompanyId, companyController.getOneCompany);

/**
 * @route   PUT /api/companies/:id
 * @desc    Update company draft
 * @access  Public
 */
router.put('/:id', validateCompanyId, validateCompany, companyController.updateCompany);

/**
 * @route   POST /api/companies/:companyId/shareholders
 * @desc    Add shareholders to a company (Step 2)
 * @access  Public
 */
router.post('/:companyId/shareholders', 
  validateCompanyIdParam, 
  validateShareholders, 
  companyController.addShareholders
);


/**
 * @route   DELETE /api/companies/:id
 * @desc    Delete a company (Standard delete)
 */
router.delete('/:id', companyController.deleteCompany); 


/**
 * @route   DELETE /api/companies/:companyId/shareholders
 * @desc    Delete all shareholders of a company
 */
router.delete('/:companyId/shareholders', companyController.deleteAllShareholders);


/**
 * @route   DELETE /api/companies/:id/cascade
 * @desc    Delete a company and its shareholders (Cascade delete)
 */
router.delete('/:id/cascade', companyController.deleteCompanyWithShareholders);  // Cascade delete

module.exports = router;