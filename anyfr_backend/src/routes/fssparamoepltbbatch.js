const express = require('express');
const router = express.Router();
const fssParamOeplTbBatch = require('../controllers/fssParamOeplTbBatch.controller');
const authenticateToken = require('../middlewares/authMiddleware');


router.post('/create', authenticateToken, fssParamOeplTbBatch.createbatch);


router.post('/list', authenticateToken, fssParamOeplTbBatch.getalltbbatch);


router.post('/list/in-active', authenticateToken, fssParamOeplTbBatch.getallinactivetbbatch);

router.put('/edit', authenticateToken, fssParamOeplTbBatch.updatetbbatch);


router.post('/loc-dropdowm', authenticateToken, fssParamOeplTbBatch.getlocbyentity);



module.exports = router;
