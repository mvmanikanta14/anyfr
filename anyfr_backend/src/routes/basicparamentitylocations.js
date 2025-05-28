const express = require('express');
const router = express.Router();
// const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
//const { initModels } = require('../models');
const basicParamEntityLocationsRawController = require('../controllers/basicparamentitylocations.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity location
router.post('/create', authenticateToken, basicParamEntityLocationsRawController.createEntityLocation);

// Edit entity location
router.put('/edit/:id', authenticateToken, basicParamEntityLocationsRawController.editEntityLocation);

// Delete entity location
router.delete('/delete/:id', authenticateToken, basicParamEntityLocationsRawController.deleteEntityLocation);

// View all entity locations
router.post('/view', authenticateToken, basicParamEntityLocationsRawController.getAllEntityLocations);

// Search entity locations
router.get('/search', authenticateToken, basicParamEntityLocationsRawController.searchEntityLocations);

module.exports = router;
