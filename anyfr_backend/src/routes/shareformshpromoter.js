const express = require('express');
const router = express.Router();

const shareformshpromoterController = require('../controllers/shareformshpromoter.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, shareformshpromoterController.getAllShareFormShPromoter);

router.post('/create', authenticateToken, shareformshpromoterController.createShareFormShPromoter);

router.put('/edit/:id', authenticateToken, shareformshpromoterController.editShareFormShPromoter);

router.delete('/delete/:id', authenticateToken, shareformshpromoterController.deleteShareFormShPromoter);

router.get('/search', authenticateToken, shareformshpromoterController.searchShareFormShPromoter);

module.exports = router;
