const express = require('express');
const router = express.Router();

const fssMastFinancialFrameworkController = require('../controllers/fssmastfinancialframework.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastFinancialFrameworkController.getAllFssMastFinancialFramework);

router.post('/create', authenticateToken, fssMastFinancialFrameworkController.createFssMastFinancialFramework);

router.put('/edit/:id', authenticateToken, fssMastFinancialFrameworkController.editFssMastFinancialFramework);

router.delete('/delete/:id', authenticateToken, fssMastFinancialFrameworkController.deleteFssMastFinancialFramework);

router.get('/search', authenticateToken, fssMastFinancialFrameworkController.searchFssMastFinancialFramework);

router.delete('/truncate', authenticateToken, fssMastFinancialFrameworkController.truncateFssMastFinancialFramework);

module.exports = router;
