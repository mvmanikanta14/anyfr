const express = require('express');
const router = express.Router();

const { initModels } = require('../models');

const basicmastfontsController = require('../controllers/basicmastfonts.controller');

const authenticateToken = require('../middlewares/authMiddleware');

// Create a new font
router.post('/create', authenticateToken, basicmastfontsController.fontCreate);

// Update an existing font
router.put('/edit/:id', authenticateToken, basicmastfontsController.fontUpdate);

// Delete a font
router.delete('/delete/:id', authenticateToken, basicmastfontsController.fontDelete);

// Get all fonts
router.get('/view', authenticateToken, basicmastfontsController.fontGetAll);

// Get a font by ID
router.get('/view/:id', authenticateToken, basicmastfontsController.fontGetById);

module.exports = router;