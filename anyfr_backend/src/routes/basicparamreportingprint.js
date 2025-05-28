const express = require('express');
const router = express.Router();

const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

const authenticateToken = require('../middlewares/authMiddleware');
const basicParamReportingPrintRawController = require('../controllers/basicparamreportingprint.controller');

// Create new reporting print
router.post('/create', authenticateToken, basicParamReportingPrintRawController.createReportPrint);

// Edit reporting print
router.put('/edit/:id', authenticateToken, basicParamReportingPrintRawController.editReportPrint);

// Delete reporting print
router.delete('/delete/:id', authenticateToken, basicParamReportingPrintRawController.deleteReportPrint);

// View all reporting prints
router.post('/view', authenticateToken, basicParamReportingPrintRawController.getAllReportPrints);

// Search reporting prints
router.get('/search', authenticateToken, basicParamReportingPrintRawController.searchReportPrints);

module.exports = router;
