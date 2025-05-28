const express = require('express');
const router = express.Router();

const fssMastCoreLineMasterController = require('../controllers/fssmastcorelinemaster.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastCoreLineMasterController.getAllFssMastCoreLineMaster);

router.post('/create', authenticateToken, fssMastCoreLineMasterController.createFssMastCoreLineMaster);

router.put('/edit/:id', authenticateToken, fssMastCoreLineMasterController.editFssMastCoreLineMaster);

router.delete('/delete/:id', authenticateToken, fssMastCoreLineMasterController.deleteFssMastCoreLineMaster);

router.get('/search', authenticateToken, fssMastCoreLineMasterController.searchFssMastCoreLineMaster);

module.exports = router;
