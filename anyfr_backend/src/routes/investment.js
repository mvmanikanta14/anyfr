const express = require('express');
const router = express.Router();

const investmentController = require('../controllers/investment.controller');
const authenticateToken = require('../middlewares/authMiddleware');

const { initModels } = require('../models');  // Import dynamic model initializer

// Middleware to attach the correct Sequelize models dynamically for each subdomain
router.use(async (req, res, next) => {
    try {
        const subdomain = req.get('host').split('.')[0]; // Extract subdomain
        req.models = await initModels(subdomain); // Store initialized models in req.models
        next();
    } catch (error) {
        console.error('Error initializing models:', error);
        res.status(500).json({ status: false, message: 'Database connection failed' });
    }
});

router.post('/view', authenticateToken, investmentController.getAllInvestments);

router.post('/create', authenticateToken, investmentController.createInvestment);

router.put('/edit/:id', authenticateToken, investmentController.updateInvestment);

router.delete('/delete/:id', authenticateToken, investmentController.deleteInvestment);

router.get('/groupsummary', authenticateToken, investmentController.getInvestmentSummary);

router.get('/getSingleInvestment', authenticateToken, investmentController.getSingleInvestment);

module.exports = router;
