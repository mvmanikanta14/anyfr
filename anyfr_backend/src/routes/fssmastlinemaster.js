const express = require('express');
const router = express.Router();

const fssMastLineMasterController = require('../controllers/fssmastlinemaster.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastLineMasterController.getAllFssMastLineMaster);

router.post('/create', authenticateToken, fssMastLineMasterController.createFssMastLineMaster);

router.put('/edit/:id', authenticateToken, fssMastLineMasterController.editFssMastLineMaster);

router.delete('/delete/:id', authenticateToken, fssMastLineMasterController.deleteFssMastLineMaster);

router.get('/search', authenticateToken, fssMastLineMasterController.searchFssMastLineMaster);

router.delete('/truncate', authenticateToken, fssMastLineMasterController.truncateFssMastLineMaster);

module.exports = router;
