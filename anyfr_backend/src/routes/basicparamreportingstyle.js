const express = require('express');
const router = express.Router();

const basicParamReportingStyleRawController = require('../controllers/basicparamreportingstyle.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new reporting style
router.post('/create', authenticateToken, basicParamReportingStyleRawController.createReportingStyle);

// Edit reporting style
router.put('/edit/:id', authenticateToken, basicParamReportingStyleRawController.editReportingStyle);

// Delete reporting style
router.delete('/delete/:id', authenticateToken, basicParamReportingStyleRawController.deleteReportingStyle);

// View all reporting styles
router.post('/view', authenticateToken, basicParamReportingStyleRawController.getAllReportingStyles);

// Search reporting styles
router.get('/search', authenticateToken, basicParamReportingStyleRawController.searchReportingStyles);

module.exports = router;
