const express = require('express');
const router = express.Router();

const fssParamEntityGlsController = require('../controllers/fssparamentitygls.controller');

const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityGlsController.getAllFssParamEntityGls);

router.post('/create', authenticateToken, fssParamEntityGlsController.createFssParamEntityGls);

router.put('/edit/:id', authenticateToken, fssParamEntityGlsController.editFssParamEntityGls);

router.delete('/delete/:id', authenticateToken, fssParamEntityGlsController.deleteFssParamEntityGls);

router.get('/search', authenticateToken, fssParamEntityGlsController.searchFssParamEntityGls);

router.delete('/truncate', authenticateToken, fssParamEntityGlsController.truncateFssParamEntityGls);
 
module.exports = router;
