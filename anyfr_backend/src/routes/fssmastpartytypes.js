const express = require('express');
const router = express.Router();

const fssMastPartyTypesController = require('../controllers/fssmastpartytypes.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastPartyTypesController.getAllFssMastPartyTypes);

router.post('/create', authenticateToken, fssMastPartyTypesController.createFssMastPartyTypes);

router.put('/edit/:id', authenticateToken, fssMastPartyTypesController.editFssMastPartyTypes);

router.delete('/delete/:id', authenticateToken, fssMastPartyTypesController.deleteFssMastPartyTypes);

router.get('/search', authenticateToken, fssMastPartyTypesController.searchFssMastPartyTypes);

router.delete('/truncate', authenticateToken, fssMastPartyTypesController.truncateFssMastPartyTypes);

module.exports = router;