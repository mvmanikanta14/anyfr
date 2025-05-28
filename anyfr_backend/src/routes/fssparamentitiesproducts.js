const express = require('express');
const router = express.Router();

const fssParamEntitiesProductsController = require('../controllers/fssparamentitiesproducts.controller');

const authenticateToken = require('../middlewares/authMiddleware');

router.post('/view', authenticateToken, fssParamEntitiesProductsController.getAllFssParamEntitiesProducts);

router.post('/create', authenticateToken, fssParamEntitiesProductsController.createFssParamEntitiesProducts);

router.put('/edit/:id', authenticateToken, fssParamEntitiesProductsController.editFssParamEntitiesProducts);

router.delete('/delete/:id', authenticateToken, fssParamEntitiesProductsController.deleteFssParamEntitiesProducts);

router.get('/search', authenticateToken, fssParamEntitiesProductsController.searchFssParamEntitiesProducts);

router.delete('/truncate', authenticateToken, fssParamEntitiesProductsController.truncateFssParamEntitiesProducts);

module.exports = router;
