const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
//const { initModels } = require('../models');

const basicparamentitygroupsController = require("../controllers/basicparamentitygroups.controller")
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity GSTIN
router.post('/create', authenticateToken, basicparamentitygroupsController.createEntityGroup);
// Edit entity GSTIN
router.put('/edit/:id', authenticateToken, basicparamentitygroupsController.editEntityGroup);
// Delete entity GSTIN
router.delete('/delete/:id', authenticateToken, basicparamentitygroupsController.deleteEntityGroup);
// View all entity TANs
router.get('/view', authenticateToken, basicparamentitygroupsController.viewAllEntityGroups);
// Search entity GSTINs
router.get('/search', authenticateToken, basicparamentitygroupsController.searchEntityGroups);

module.exports = router;
