const express = require('express');
const router = express.Router();
const fssParamOepMappOver = require('../controllers/fssParamOepMappOver.controller');
const authenticateToken = require('../middlewares/authMiddleware');


// Route to list all active mappings
router.post('/create', authenticateToken, fssParamOepMappOver.createOverride);

router.post('/list', authenticateToken, fssParamOepMappOver.getbyid);


router.put('/edit', authenticateToken, fssParamOepMappOver.updateoverride);


 
 
module.exports = router;
