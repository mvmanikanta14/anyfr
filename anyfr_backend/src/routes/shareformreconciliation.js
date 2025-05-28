const express = require('express');
const router = express.Router();

const shareFormReconciliationController = require('../controllers/shareformreconciliation.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, shareFormReconciliationController.getAllShareFormReconciliation);
router.post('/create', authenticateToken, shareFormReconciliationController.createShareFormReconciliation);
router.put('/edit/:id', authenticateToken, shareFormReconciliationController.editShareFormReconciliation);
router.delete('/delete/:id', authenticateToken, shareFormReconciliationController.deleteShareFormReconciliation);
router.get('/search', authenticateToken, shareFormReconciliationController.searchShareFormReconciliation);

module.exports = router;
