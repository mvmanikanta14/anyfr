const express = require('express');
const router = express.Router();

const fssParamEntityTransactionNatureController = require('../controllers/fssparamentitytransactionnature.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityTransactionNatureController.getAllFssParamEntityTransactionNature);

router.post('/create', authenticateToken, fssParamEntityTransactionNatureController.createFssParamEntityTransactionNature);

router.put('/edit/:id', authenticateToken, fssParamEntityTransactionNatureController.editFssParamEntityTransactionNature);

router.delete('/delete/:id', authenticateToken, fssParamEntityTransactionNatureController.deleteFssParamEntityTransactionNature);

router.get('/search', authenticateToken, fssParamEntityTransactionNatureController.searchFssParamEntityTransactionNature);

router.delete('/truncate', authenticateToken, fssParamEntityTransactionNatureController.truncateFssParamEntityTransactionNature);

module.exports = router;
