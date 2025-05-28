const express = require('express');
const router = express.Router();
const fssparamoefsli = require('../controllers/fssparamoefsli.controller');
const authenticateToken = require('../middlewares/authMiddleware');


// Route to list all active mappings
router.post('/list', authenticateToken, fssparamoefsli.getalloefsli);


router.post('/create', authenticateToken, fssparamoefsli.createfsli);


router.post('/list-pa', authenticateToken, fssparamoefsli.getalloefslipa);


router.put('/edit', authenticateToken, fssparamoefsli.updatefsli);
 
module.exports = router;
