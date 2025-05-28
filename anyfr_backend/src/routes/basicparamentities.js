const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
//const { initModels } = require('../models');
const basicParamEntitiesRawController = require('../controllers/basicparamentities.controller');
const authenticateToken = require('../middlewares/authMiddleware');

const { validateEntity } = require("../utils/entityValidation");



// Create new entity
router.post('/create', authenticateToken,validateEntity, basicParamEntitiesRawController.createEntity);

// Edit entity
router.put('/edit/:id', authenticateToken,validateEntity, basicParamEntitiesRawController.editEntity);

// Edit entity
router.put('/edit-tan/:id', authenticateToken, basicParamEntitiesRawController.editEntityTan);

// Delete entity
router.delete('/delete/:id', authenticateToken, basicParamEntitiesRawController.deleteEntity);

//Active financial framework
router.put('/active/:id', authenticateToken, basicParamEntitiesRawController.activeEntity);

// View all entities
router.post('/list', authenticateToken, basicParamEntitiesRawController.getAllEntities);

router.get('/framework-list', authenticateToken, basicParamEntitiesRawController.getAllEntitiMast);

router.get('/list/drop-down', authenticateToken, basicParamEntitiesRawController.getAllEntitiesdrop);


router.get('/inactive-list', authenticateToken, basicParamEntitiesRawController.    getAllInactiveEntities);

router.get('/list/:id', authenticateToken, basicParamEntitiesRawController.getEntityById);


router.post('/list/module', authenticateToken, basicParamEntitiesRawController.getModule);


// Search entities
router.get('/search', authenticateToken, basicParamEntitiesRawController.searchEntities);

module.exports = router;
