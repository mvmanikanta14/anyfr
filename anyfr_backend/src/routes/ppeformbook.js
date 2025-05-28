const express = require('express');
const router = express.Router();
const ppeformbookController = require('../controllers/ppeformbook.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, ppeformbookController.getAllPpeFormBook);
router.post('/create', authenticateToken, ppeformbookController.createPpeFormBook);
router.put('/edit/:id', authenticateToken, ppeformbookController.editPpeFormBook);
router.delete('/delete/:id', authenticateToken, ppeformbookController.deletePpeFormBook);
router.get('/search', authenticateToken, ppeformbookController.searchPpeFormBook);

module.exports = router;
