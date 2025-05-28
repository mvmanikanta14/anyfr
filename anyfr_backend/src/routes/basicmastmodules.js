const express = require('express');
const router = express.Router();

const { initModels } = require('../models');
const basicmastmodulesController = require('../controllers/basicmastmodules.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create a new module
router.post('/create', authenticateToken, basicmastmodulesController.createModule);

// Update an existing module
router.put('/edit/:id', authenticateToken, basicmastmodulesController.updateModule);

// Delete a module
router.delete('/delete/:id', authenticateToken, basicmastmodulesController.deleteModule);

// Get all modules
router.get('/view', authenticateToken, basicmastmodulesController.getAllModule);

// Search modules
router.get('/search', authenticateToken, basicmastmodulesController.searchModule);

module.exports = router;
