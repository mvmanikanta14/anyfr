const express = require('express');
const router = express.Router();

const fssMastUnitsOfMeasurementController = require('../controllers/fssmastunitsofmeasurement.controller');

const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastUnitsOfMeasurementController.getAllFssMastUnitsOfMeasurement);

router.post('/create', authenticateToken, fssMastUnitsOfMeasurementController.createFssMastUnitsOfMeasurement);

router.put('/edit/:id', authenticateToken, fssMastUnitsOfMeasurementController.updateFssMastUnitsOfMeasurement);

router.delete('/delete/:id', authenticateToken, fssMastUnitsOfMeasurementController.deleteFssMastUnitsOfMeasurement);

router.get('/search', authenticateToken, fssMastUnitsOfMeasurementController.searchFssMastUnitsOfMeasurement);

router.delete('/truncate', authenticateToken, fssMastUnitsOfMeasurementController.truncateFssMastUnitsOfMeasurement);
 
module.exports = router;
