const express = require('express');
const router = express.Router();

const fssParanEntityPartyRelationsController = require('../controllers/fssparanentitypartyrelations.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParanEntityPartyRelationsController.getAllFssParanEntityPartyRelations);
router.post('/create', authenticateToken, fssParanEntityPartyRelationsController.createFssParanEntityPartyRelations);
router.put('/edit/:id', authenticateToken, fssParanEntityPartyRelationsController.editFssParanEntityPartyRelations);
router.delete('/delete/:id', authenticateToken, fssParanEntityPartyRelationsController.deleteFssParanEntityPartyRelations);
router.get('/search', authenticateToken, fssParanEntityPartyRelationsController.searchFssParanEntityPartyRelations);
router.delete('/truncate', fssParanEntityPartyRelationsController.truncateFssParanEntityPartyRelations);

module.exports = router;
