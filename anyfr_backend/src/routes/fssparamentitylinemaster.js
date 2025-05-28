const express = require('express');
const router = express.Router();

const fssParamEntityLineMasterController = require('../controllers/fssparamentitylinemaster.controller');

const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityLineMasterController.getAllFssParamEntityLineMaster);

router.post('/create', authenticateToken, fssParamEntityLineMasterController.createFssParamEntityLineMaster);

router.put('/edit/:id', authenticateToken, fssParamEntityLineMasterController.editFssParamEntityLineMaster);

router.delete('/delete/:id', authenticateToken, fssParamEntityLineMasterController.deleteFssParamEntityLineMaster);

router.get('/search', authenticateToken, fssParamEntityLineMasterController.searchFssParamEntityLineMaster);

router.delete('/truncate', authenticateToken, fssParamEntityLineMasterController.truncateFssParamEntityLineMaster);

module.exports = router;
