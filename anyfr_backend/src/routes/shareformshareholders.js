const express = require('express');
const router = express.Router();

const shareFormShareholdersController = require('../controllers/shareformshareholders.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, shareFormShareholdersController.getAllShareFormShareholders);

router.post('/create', authenticateToken, shareFormShareholdersController.createShareFormShareholders);

router.put('/edit/:id', authenticateToken, shareFormShareholdersController.editShareFormShareholders);

router.delete('/delete/:id', authenticateToken, shareFormShareholdersController.deleteShareFormShareholders);

router.get('/search', authenticateToken, shareFormShareholdersController.searchShareFormShareholders);

module.exports = router;
