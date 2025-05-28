// routes/arapApTranInvoices.routes.js
const express = require('express');
const router = express.Router();
const arapApTranInvoicesController = require('../controllers/ArapApTranInvoices.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// List AP invoices
router.post('/list', authenticateToken, arapApTranInvoicesController.getallinvoice);

// Create a new invoice
router.post('/create', authenticateToken, arapApTranInvoicesController.createInvoice);

// Update an existing invoice
router.put('/edit', authenticateToken, arapApTranInvoicesController.updateInvoice);

// Soft-delete an invoice
router.delete('/delete/:id', authenticateToken, arapApTranInvoicesController.deleteInvoice);

module.exports = router;
