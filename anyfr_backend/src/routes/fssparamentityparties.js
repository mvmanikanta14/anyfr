const express = require('express');
const router = express.Router();

const fssParamEntityPartiesController = require('../controllers/fssparamentityparties.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityPartiesController.getAllFssParamEntityParties);

router.post('/create', authenticateToken, fssParamEntityPartiesController.createFssParamEntityParties);

router.put('/edit/:id', authenticateToken, fssParamEntityPartiesController.editFssParamEntityParties);

router.delete('/delete/:id', authenticateToken, fssParamEntityPartiesController.deleteFssParamEntityParties);

router.get('/search', authenticateToken, fssParamEntityPartiesController.searchFssParamEntityParties);

router.delete('/truncate', authenticateToken, fssParamEntityPartiesController.truncateFssParamEntityParties);

module.exports = router;
 
