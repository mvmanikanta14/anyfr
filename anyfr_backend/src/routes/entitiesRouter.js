const express = require('express');
const router = express.Router();

const entitiesController = require('../controllers/entities.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Create new entity
router.post('/create', authenticateToken, entitiesController.createEntity)

// Edit entity
router.put('/edit/:id', authenticateToken, entitiesController.editEntity)

// Delete entity
router.delete('/delete/:id', authenticateToken, entitiesController.deleteEntity)

// View all entities
router.post('/view', authenticateToken, entitiesController.getAllEntities)

// Search entities
router.get('/search', authenticateToken, entitiesController.searchEntities)

module.exports = router;
