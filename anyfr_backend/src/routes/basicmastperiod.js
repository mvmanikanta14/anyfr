const express = require('express');
const router = express.Router();
const basicMastPeriods = require('../controllers/basicMastPeriods.controller');
const authenticateToken = require('../middlewares/authMiddleware');


// View all reporting periods
router.get('/list', authenticateToken, basicMastPeriods.getAllReportingPeriods);

 
 

module.exports = router;
