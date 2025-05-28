const express = require('express');
const router = express.Router();
const basicParamOePeriodController = require('../controllers/basicParamOePeriod.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new OE Period
router.post('/create', authenticateToken, basicParamOePeriodController.createOePeriod);

// Edit OE Period
router.put('/edit/:id', authenticateToken, basicParamOePeriodController.editOePeriod);

// View all active OE Periods
router.get('/list', authenticateToken, basicParamOePeriodController.getAllOePeriods);


router.post('/list/entity', authenticateToken, basicParamOePeriodController.getAllOePeriodseid);

// View all inactive OE Periods
router.get('/list/in-active', authenticateToken, basicParamOePeriodController.getAllOePeriodsInactive);

// Get OE Period by ID
router.get('/:id', authenticateToken, basicParamOePeriodController.getOePeriodById);

// Soft delete OE Period
router.delete('/delete/:id', authenticateToken, basicParamOePeriodController.deleteOePeriod);

module.exports = router;
