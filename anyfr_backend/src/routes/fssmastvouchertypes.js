const express = require('express');
const router = express.Router();

const fssMastVoucherTypesController = require('../controllers/fssmastvouchertypes.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssMastVoucherTypesController.getAllFssMastVoucherTypes);

router.post('/create', authenticateToken, fssMastVoucherTypesController.createFssMastVoucherTypes);

router.put('/edit/:id', authenticateToken, fssMastVoucherTypesController.updateFssMastVoucherTypes);

router.delete('/delete/:id', authenticateToken, fssMastVoucherTypesController.deleteFssMastVoucherTypes);

router.get('/search', authenticateToken, fssMastVoucherTypesController.searchFssMastVoucherTypes);
router.get('/voucher-dropdown', authenticateToken, fssMastVoucherTypesController.getAllDropdown);

router.delete('/truncate', authenticateToken, fssMastVoucherTypesController.truncateFssMastVoucherTypes);

module.exports = router;
