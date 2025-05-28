const express = require('express');
const router = express.Router();
const dataTbDbController = require('../controllers/dataTbDb.controller');
const authenticateToken = require('../middlewares/authMiddleware');
router.post('/list', authenticateToken, dataTbDbController.getAllTbDb); 
router.post('/unloaded', authenticateToken, dataTbDbController.getAllTbDbUnloaded); 
router.get('/downloadsamplefile',dataTbDbController.downloadsamplefile);
router.post('/loadtbexcelbybatchid', authenticateToken, dataTbDbController.loadExcelTByBatchId);
router.post('/unloadtbexcelbybatchid', authenticateToken, dataTbDbController.UnloadExcelTByBatchId); 

module.exports = router;
