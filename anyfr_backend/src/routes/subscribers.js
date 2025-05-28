const express = require('express');
const router = express.Router();


const SubscribersController = require('../controllers/subscribers.controller');

// Create a new subscriber
router.post('/create', SubscribersController.createSubscriber);

// Get all subscribers
router.get('/view', SubscribersController.getAllSubscriber);

module.exports = router;
