const express = require('express');
const router = express.Router();
const fssTranOeplTbvalRaw = require('../controllers/fssTranOeplTbvalRaw.controller');
const authenticateToken = require('../middlewares/authMiddleware');


router.post('/create', authenticateToken, fssTranOeplTbvalRaw.createtbval);


router.post('/list', authenticateToken, fssTranOeplTbvalRaw.getalltbval);

router.put('/edit', authenticateToken, fssTranOeplTbvalRaw.updatetbval);



module.exports = router;
