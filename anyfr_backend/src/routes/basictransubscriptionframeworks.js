const express = require('express');
const router = express.Router();

const basicTranSubscriptionFrameworksRawController = require('../controllers/basictransubscriptionframeworks.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new subscription framework
router.post('/create', authenticateToken, basicTranSubscriptionFrameworksRawController.createSubscriptionFramework);

// Edit subscription framework
router.put('/edit/:id', authenticateToken, basicTranSubscriptionFrameworksRawController.editSubscriptionFramework);

// Delete subscription framework
router.delete('/delete/:id', authenticateToken, basicTranSubscriptionFrameworksRawController.deleteSubscriptionFramework);

// View all subscription frameworks
router.post('/view', authenticateToken, basicTranSubscriptionFrameworksRawController.getAllSubscriptionFrameworks);

// Search subscription frameworks
router.get('/search', authenticateToken, basicTranSubscriptionFrameworksRawController.searchSubscriptionFrameworks);

module.exports = router;
