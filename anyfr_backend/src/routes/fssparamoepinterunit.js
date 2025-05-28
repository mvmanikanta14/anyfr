const express = require('express');
const router = express.Router();
const fssParamOepInterunit = require('../controllers/fssParamOepInterunit.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Route to create a new mapping
router.post('/create', authenticateToken, fssParamOepInterunit.createInterUnit);
// Route to list all active mappings
router.post('/list', authenticateToken, fssParamOepInterunit.getAllInterUnit);
router.get('/:id', authenticateToken, fssParamOepInterunit.getInterUnitById);
router.put('/edit/:id', authenticateToken, fssParamOepInterunit.editInterUnit);
router.delete('/delete/:id', authenticateToken, fssParamOepInterunit.deleteInterUnit);
/*
// Route to update a mapping
router.put('/edit/:id', authenticateToken, fssParamOepRectification.editRect);

// Route to list all active mappings
router.post('/list', authenticateToken, fssParamOepRectification.getAllRect);

// Route to list all inactive mappings
router.post('/list/in-active', authenticateToken, fssParamOepRectification.getAllInactiveRect);

// Route to get a mapping by ID
router.get('/:id', authenticateToken, fssParamOepRectification.getRectById);

// Route to soft delete a mapping
router.delete('/delete/:id', authenticateToken, fssParamOepRectification.deleteRect);

// Route to restore a soft-deleted mapping
router.put('/restore/:id', authenticateToken, fssParamOepRectification.restoreRect);

router.post('/search', authenticateToken, fssParamOepRectification.searchRect);
*/


module.exports = router;
