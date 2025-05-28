const express = require('express');
const router = express.Router();
//const { initModels } = require('../models');
const basictransubscriptionmodulesController = require('../controllers/basictransubscriptionmodules.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new subscription module
router.post('/create', authenticateToken, basictransubscriptionmodulesController.createSubscriptionModule);

// Edit subscription module
router.put('/edit/:id', authenticateToken, basictransubscriptionmodulesController.editSubscriptionModule);

// Delete subscription module
router.delete('/delete/:id', authenticateToken, basictransubscriptionmodulesController.deleteSubscriptionModule);

// View all subscription modules
router.post('/view', authenticateToken, basictransubscriptionmodulesController.getAllSubscriptionModules);

// Search subscription modules
router.get('/search', authenticateToken, basictransubscriptionmodulesController.searchSubscriptionModules);

module.exports = router;
