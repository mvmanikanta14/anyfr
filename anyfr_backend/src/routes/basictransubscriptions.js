const express = require('express');
const router = express.Router();

const basictransubscriptionsController = require('../controllers/basictransubscriptions.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new subscription
router.post('/create', authenticateToken, basictransubscriptionsController.createSubscription);

// Edit subscription
router.put('/edit/:id', authenticateToken, basictransubscriptionsController.editSubscription);

// Delete subscription
router.delete('/delete/:id', authenticateToken, basictransubscriptionsController.deleteSubscription);

// View all subscriptions
router.post('/view', authenticateToken, basictransubscriptionsController.getAllSubscriptions);

// Search subscriptions
router.get('/search', authenticateToken, basictransubscriptionsController.searchSubscriptions);

module.exports = router;
