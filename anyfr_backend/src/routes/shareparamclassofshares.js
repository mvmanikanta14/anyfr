const express = require('express');
const router = express.Router();

const shareparamclassofsharesController = require('../controllers/shareparamclassofshares.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/list', authenticateToken, shareparamclassofsharesController.getAllShareParamClassOfShare);

router.post('/create', authenticateToken, shareparamclassofsharesController.createShareParamClassOfShare);

router.put('/edit/:id', authenticateToken, shareparamclassofsharesController.editShareParamClassOfShare);

router.delete('/delete/:id', authenticateToken, shareparamclassofsharesController.deleteShareParamClassOfShare);

router.get('/search', authenticateToken, shareparamclassofsharesController.searchShareParamClassOfShare);

module.exports = router;