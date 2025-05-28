const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper');

const fssParamEntityVouchersController = require('../controllers/fssparamentityvouchers.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityVouchersController.getAllFssParamEntityVouchers);

router.post('/create', authenticateToken, fssParamEntityVouchersController.createFssParamEntityVouchers);

router.put('/edit/:id', authenticateToken, fssParamEntityVouchersController.editFssParamEntityVouchers);

router.delete('/delete/:id', authenticateToken, fssParamEntityVouchersController.deleteFssParamEntityVouchers);

router.get('/search', authenticateToken, fssParamEntityVouchersController.searchFssParamEntityVouchers);

router.delete('/truncate', authenticateToken, fssParamEntityVouchersController.truncateFssParamEntityVouchers);

module.exports = router;
