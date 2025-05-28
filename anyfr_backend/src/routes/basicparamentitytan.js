const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
//const { initModels } = require('../models');

const basicParamEntityTANRawController = require('../controllers/basicparamentitytan.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity TAN
router.post('/create', authenticateToken, basicParamEntityTANRawController.createEntityTAN);

// Edit entity TAN
router.put('/edit/:id', authenticateToken, basicParamEntityTANRawController.editEntityTAN);

// Delete entity TAN
router.delete('/delete/:id', authenticateToken, basicParamEntityTANRawController.deleteEntityTAN);

// View all entity TANs
router.post('/view', authenticateToken, basicParamEntityTANRawController.getAllEntityTANs);

// Search entity TANs
router.get('/search', authenticateToken, basicParamEntityTANRawController.searchEntityTANs);

module.exports = router;
