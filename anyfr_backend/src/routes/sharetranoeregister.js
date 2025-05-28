const express = require('express');
const router = express.Router();
const shareTranOeRegister = require('../controllers/shareTranOeRegister.controller');
const authenticateToken = require('../middlewares/authMiddleware');

 
router.post('/list', authenticateToken, shareTranOeRegister.getallshare);

router.get('/list/TypeofShare', authenticateToken, shareTranOeRegister.getAllTypeOfshare);



router.post('/list/ClassOfShare', authenticateToken, shareTranOeRegister.getAllClassOfShare);


router.get('/list/modeofissues', authenticateToken, shareTranOeRegister.getAllModeOfIssues);

router.get('/list/typeofconsider', authenticateToken, shareTranOeRegister.getAllTypeofConsider);


router.get('/list/typeofshareholder', authenticateToken, shareTranOeRegister.getAlltypeofshareholder);
 

router.post('/list/parties', authenticateToken, shareTranOeRegister.getAllParties);


router.post('/create', authenticateToken, shareTranOeRegister.createSharecapital);

router.put('/edit', authenticateToken, shareTranOeRegister.updateSharecapital);

router.delete('/delete/:id', authenticateToken, shareTranOeRegister.deleteShareCaptial);

 

module.exports = router;
