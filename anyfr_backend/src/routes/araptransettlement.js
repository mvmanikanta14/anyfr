// routes/arapTranSettlement.routes.js
const express = require('express');
const router = express.Router();
const arapTranSettlementController = require('../controllers/ArapTranSettlement.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// List AR/AP settlements
router.post('/list', authenticateToken, arapTranSettlementController.getallinvoice);


router.post('/list/refdrop', authenticateToken, arapTranSettlementController.getallmodule);

// Create a new settlement entry
router.post('/create', authenticateToken, arapTranSettlementController.createInvoice);

// Update an existing settlement
router.put('/edit', authenticateToken, arapTranSettlementController.updateInvoice);

// Soft-delete a settlement by ID
router.delete('/delete/:id', authenticateToken, arapTranSettlementController.deleteInvoice);

module.exports = router;
