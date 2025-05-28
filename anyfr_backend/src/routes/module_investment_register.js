const express = require('express');
const router = express.Router();
const moduleInvestmentRegisterController = require('../controllers/moduleInvestmentRegister.controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/investee-types-dropdown', authenticateToken, moduleInvestmentRegisterController.getAllInvesteeTypes); 
router.post('/list', authenticateToken, moduleInvestmentRegisterController.getAllRegisters);
router.post('/instrument-types-dropdown', authenticateToken, moduleInvestmentRegisterController.getAllInstruementsTypes);
router.post('/measurement-types-dropdown', authenticateToken, moduleInvestmentRegisterController.getAllMeasurementsTypes);
router.post('/inactiveInvestmentRegisterItem', authenticateToken, moduleInvestmentRegisterController.deleteItem);
router.post('/activeInvestmentRegisterItem', authenticateToken, moduleInvestmentRegisterController.restoreItem);

router.post('/create', authenticateToken, moduleInvestmentRegisterController.createInvestmentRegister);
router.put('/edit', authenticateToken, moduleInvestmentRegisterController.editInvestmentRegister);
router.delete('/delete/:id', authenticateToken, moduleInvestmentRegisterController.deleteItem); 





module.exports = router;
