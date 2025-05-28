const express = require('express');
const router = express.Router();
const shareMasterTypeOfSharesController = require('../controllers/sharemastertypeofshares.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, shareMasterTypeOfSharesController.getAllShareMasterTypeOfShares);

router.post('/create', authenticateToken, shareMasterTypeOfSharesController.createShareMasterTypeOfShares);

router.put('/edit/:id', authenticateToken, shareMasterTypeOfSharesController.editShareMasterTypeOfShares);

router.delete('/delete/:id', authenticateToken, shareMasterTypeOfSharesController.deleteShareMasterTypeOfShares);

router.get('/search', authenticateToken, shareMasterTypeOfSharesController.searchShareMasterTypeOfShares);

module.exports = router;
