// routes/arapApTranInvoices.routes.js
const express = require('express');
const router = express.Router();
const ArapAdvrTranInvoices = require('../controllers/ArapAdvrTranInvoices.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// List AP invoices
router.post('/list', authenticateToken, ArapAdvrTranInvoices.getallinvoice);

// Create a new invoice
router.post('/create', authenticateToken, ArapAdvrTranInvoices.createInvoice);

// Update an existing invoice
router.put('/edit', authenticateToken, ArapAdvrTranInvoices.updateInvoice);

// Soft-delete an invoice
router.delete('/delete/:id', authenticateToken, ArapAdvrTranInvoices.deleteInvoice);

module.exports = router;
