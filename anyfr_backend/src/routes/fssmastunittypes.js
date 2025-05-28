const express = require('express');
const router = express.Router();

const fssMastUnitTypesController = require('../controllers/fssmastunittypes.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastUnitTypesController.getAllFssMastUnitTypes);

router.post('/create', authenticateToken, fssMastUnitTypesController.createFssMastUnitTypes);

router.put('/edit/:id', authenticateToken, fssMastUnitTypesController.updateFssMastUnitTypes);

router.delete('/delete/:id', authenticateToken, fssMastUnitTypesController.deleteFssMastUnitTypes);

router.get('/search', authenticateToken, fssMastUnitTypesController.searchFssMastUnitTypes);

router.delete('/truncate', authenticateToken, fssMastUnitTypesController.truncateFssMastUnitTypes);

module.exports = router;
 
