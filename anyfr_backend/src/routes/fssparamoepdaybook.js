const express = require('express');
const router = express.Router();
const fssParamOepDaybook = require('../controllers/fssParamOepDaybook.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Route to create a new mapping
router.post('/create', authenticateToken, fssParamOepDaybook.createDaybook);
// Route to list all active mappings
router.post('/list', authenticateToken, fssParamOepDaybook.getAllDaybook);
router.get('/:id', authenticateToken, fssParamOepDaybook.getDaybookById);
router.put('/edit/:id', authenticateToken, fssParamOepDaybook.editDaybook);
router.delete('/delete/:id', authenticateToken, fssParamOepDaybook.deleteDaybook);

module.exports = router;
