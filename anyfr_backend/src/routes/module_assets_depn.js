const express = require('express');
const router = express.Router();
const moduleAssetsDepnController = require('../controllers/moduleAssetsDepn.controller');
const authenticateToken = require('../middlewares/authMiddleware');
router.post('/list', authenticateToken, moduleAssetsDepnController.getAllAssetsDepn); 
router.post('/category-dropdown', authenticateToken, moduleAssetsDepnController.getAllCategory); 
router.post('/subcategory-dropdown', authenticateToken, moduleAssetsDepnController.getAllSubCategory); 
router.post('/block-dropdown', authenticateToken, moduleAssetsDepnController.getAllBlock); 
router.post('/createassetsDepn', authenticateToken, moduleAssetsDepnController.createAssetsDepn); 
router.put('/updateassetsDepn', authenticateToken, moduleAssetsDepnController.updateAssetsDepn);
//router.delete('/deleteAssetsDepn', authenticateToken, moduleAssetsDepnController.updateAssetsDepn);
router.delete('/deleteAssetsDepn/:id', authenticateToken, moduleAssetsDepnController.deleteItem); 
router.get('/downloadsamplefile',moduleAssetsDepnController.downloadsamplefile);
//router.post('/uploadexcelAssetsDepn', authenticateToken, moduleAssetsDepnController.uploadexcelAssetsDepn); 
 

module.exports = router;
