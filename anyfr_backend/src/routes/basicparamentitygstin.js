const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
//const { initModels } = require('../models');
const basicParamEntityGSTINRawController = require('../controllers/basicparamentitygstin.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity GSTIN
router.post('/create', authenticateToken, basicParamEntityGSTINRawController.createEntityGSTIN);

// Edit entity GSTIN
router.put('/edit/:id', authenticateToken, basicParamEntityGSTINRawController.editEntityGSTIN);

// Delete entity GSTIN
router.delete('/delete/:id', authenticateToken, basicParamEntityGSTINRawController.deleteEntityGSTIN);

// View all entity TANs
router.get('/view', authenticateToken, basicParamEntityGSTINRawController.getAllEntitiesGSTINs);

// Search entity GSTINs
router.get('/search', authenticateToken, basicParamEntityGSTINRawController.searchEntitiesGSTINs);

module.exports = router;
