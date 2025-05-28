const express = require('express');
const router = express.Router();
const controller = require('../controllers/basicparammodules.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/create', authenticateToken, controller.createModule);
router.put('/edit/:id', authenticateToken, controller.editModule);
router.post('/list', authenticateToken, controller.getAllModules);
router.get('list/:id', authenticateToken, controller.getModuleById);
router.delete('/delete/:id', authenticateToken, controller.deleteModule);

module.exports = router;
