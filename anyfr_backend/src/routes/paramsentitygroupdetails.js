const express = require('express');
const router = express.Router();
// const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
// //const { initModels } = require('../models');

const paramsEntityGroupDetailsRawController = require('../controllers/paramsentitygroupdetails.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity group detail
router.post('/create', authenticateToken, paramsEntityGroupDetailsRawController.createEntityGroupDetail);
// Edit entity group detail
router.put('/edit/:id', authenticateToken, paramsEntityGroupDetailsRawController.editEntityGroupDetail);
// Delete entity group detail
router.delete('/delete/:id', authenticateToken, paramsEntityGroupDetailsRawController.deleteEntityGroupDetail);
// View all entity group details
router.post('/view', authenticateToken, paramsEntityGroupDetailsRawController.getAllEntityGroupDetails);
// Search entity group details
router.get('/search', authenticateToken, paramsEntityGroupDetailsRawController.searchEntityGroupDetails);

module.exports = router;
