// routes/arapApTranInvoices.routes.js
const express = require('express');
const router = express.Router();
const ArapAdvpTranInvoices = require('../controllers/ArapAdvpTranInvoices.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// List AP invoices
router.post('/list', authenticateToken, ArapAdvpTranInvoices.getallinvoice);

// Create a new invoice
router.post('/create', authenticateToken, ArapAdvpTranInvoices.createInvoice);

// Update an existing invoice
router.put('/edit', authenticateToken, ArapAdvpTranInvoices.updateInvoice);

// Soft-delete an invoice
router.delete('/delete/:id', authenticateToken, ArapAdvpTranInvoices.deleteInvoice);

module.exports = router;
