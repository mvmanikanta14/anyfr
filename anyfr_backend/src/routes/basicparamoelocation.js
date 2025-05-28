const express = require('express');
const router = express.Router();
const basicParamOeLocationController = require('../controllers/basicParamOeLocation.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new OE Location
router.post('/create', authenticateToken, basicParamOeLocationController.createOeLocation);

// Edit OE Location
router.put('/edit/:id', authenticateToken, basicParamOeLocationController.editOeLocation);

// Add any additional update endpoints here (e.g., approve location)

// View all active OE Locations
router.post('/list', authenticateToken, basicParamOeLocationController.getAllOeLocations);

// View all inactive OE Locations
router.post('/list/in-active', authenticateToken, basicParamOeLocationController.getAllOeLocationsInactive);

// Get OE Location by ID
router.get('/:id', authenticateToken, basicParamOeLocationController.getOeLocationById);

// Soft delete OE Location
router.delete('/delete/:id', authenticateToken, basicParamOeLocationController.deleteOeLocation);

module.exports = router;
