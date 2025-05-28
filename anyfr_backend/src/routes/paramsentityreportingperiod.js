const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/authMiddleware');
const paramsEntityReportingPeriodRawController = require('../controllers/paramsentityreportingperiod.controller');

// Create new entity reporting period
router.post('/create', authenticateToken, paramsEntityReportingPeriodRawController.createEntityReportingPeriod);

// Edit entity reporting period
router.put('/edit/:id', authenticateToken, paramsEntityReportingPeriodRawController.editEntityReportingPeriod);

// Delete entity reporting period
router.delete('/delete/:id', authenticateToken, paramsEntityReportingPeriodRawController.deleteEntityReportingPeriod);

// View all entity reporting periods
router.post('/view', authenticateToken, paramsEntityReportingPeriodRawController.getAllEntityReportingPeriods);

// Search entity reporting periods
router.get('/search', authenticateToken, paramsEntityReportingPeriodRawController.searchEntityReportingPeriods);

module.exports = router;
