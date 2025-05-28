// routes/arapApTranInvoices.routes.js
const express = require('express');
const router = express.Router();
const ArapArTranInvoices = require('../controllers/ArapArTranInvoices.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// List AP invoices
router.post('/list', authenticateToken, ArapArTranInvoices.getallinvoice);

// Create a new invoice
router.post('/create', authenticateToken, ArapArTranInvoices.createInvoice);

// Update an existing invoice
router.put('/edit', authenticateToken, ArapArTranInvoices.updateInvoice);

// Soft-delete an invoice
router.delete('/delete/:id', authenticateToken, ArapArTranInvoices.deleteInvoice);

module.exports = router;
