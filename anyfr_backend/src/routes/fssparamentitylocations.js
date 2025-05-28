const express = require('express');
const router = express.Router();

const fssParamEntityLocationsController = require('../controllers/fssparamentitylocations.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntityLocationsController.getAllFssParamEntityLocations);

router.post('/create', authenticateToken, fssParamEntityLocationsController.createFssParamEntityLocations);

router.put('/edit/:id', authenticateToken, fssParamEntityLocationsController.editFssParamEntityLocations);

router.delete('/delete/:id', authenticateToken, fssParamEntityLocationsController.deleteFssParamEntityLocations);

router.get('/search', authenticateToken, fssParamEntityLocationsController.searchFssParamEntityLocations);

router.delete('/truncate', authenticateToken, fssParamEntityLocationsController.truncateFssParamEntityLocations);

module.exports = router;
