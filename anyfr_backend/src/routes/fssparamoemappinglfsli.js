const express = require('express');
const router = express.Router();
const fssParamOeMappingGlFsliController = require('../controllers/fssParamOeMappingGlFsli.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Route to create a new mapping
router.post('/create', authenticateToken, fssParamOeMappingGlFsliController.createMapping);

// Route to update a mapping
router.put('/edit/:id', authenticateToken, fssParamOeMappingGlFsliController.editMapping);

// Route to list all active mappings
router.post('/list', authenticateToken, fssParamOeMappingGlFsliController.getAllMappings);

// Route to list all inactive mappings
router.post('/list/in-active', authenticateToken, fssParamOeMappingGlFsliController.getAllInactiveMappings);

// Route to get a mapping by ID
router.get('/:id', authenticateToken, fssParamOeMappingGlFsliController.getMappingById);

// Route to soft delete a mapping
router.delete('/delete/:id', authenticateToken, fssParamOeMappingGlFsliController.deleteMapping);

// Route to restore a soft-deleted mapping
router.put('/restore/:id', authenticateToken, fssParamOeMappingGlFsliController.restoreMapping);



router.put('/bluk-map', authenticateToken, fssParamOeMappingGlFsliController.bulkfsli);

router.post('/search', authenticateToken, fssParamOeMappingGlFsliController.searchfsli);



router.post('/fss-view', authenticateToken, fssParamOeMappingGlFsliController.getAllfssview);

router.post('/group-view', authenticateToken, fssParamOeMappingGlFsliController.getAllgroupview);

router.post('/map-id', authenticateToken, fssParamOeMappingGlFsliController.getAllmapid);

router.post('/group-id', authenticateToken, fssParamOeMappingGlFsliController.getAllgroupid);


router.post('/gl-dropdown', authenticateToken, fssParamOeMappingGlFsliController.getAllDropdown);

 

module.exports = router;
