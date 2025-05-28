const express = require('express');
const router = express.Router();

const fssMastPartyRelationShipTypesController = require('../controllers/fssmastpartyrelationshiptypes.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastPartyRelationShipTypesController.getAllFssMastPartyRelationshipTypes);

router.post('/create', authenticateToken, fssMastPartyRelationShipTypesController.createFssMastPartyRelationshipTypes);

router.put('/edit/:id', authenticateToken, fssMastPartyRelationShipTypesController.editFssMastPartyRelationshipTypes);

router.delete('/delete/:id', authenticateToken, fssMastPartyRelationShipTypesController.deleteFssMastPartyRelationshipTypes);

router.get('/search', authenticateToken, fssMastPartyRelationShipTypesController.searchFssMastPartyRelationshipTypes);

router.delete('/truncate', authenticateToken, fssMastPartyRelationShipTypesController.truncateFssMastPartyRelationshipTypes);

module.exports = router;
