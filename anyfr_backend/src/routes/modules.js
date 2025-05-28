const express = require('express');
const router = express.Router();
const inventoryMovment = require('../testjson/inventoryMovment');
const inventoryPY = require('../testjson/inventoryPY');
const inventoryCT = require('../testjson/inventoryCT');
const inventoryForex = require('../testjson/inventoryForex');

const inv_tran_ope_mtm = require('../testjson/inv_tran_ope_mtm');
const expenses = require('../testjson/expenses');



router.get('/exp', (req, res) => {
    res.json(expenses.expenses);
});


router.get('/inv-mtm', (req, res) => {
    res.json(inv_tran_ope_mtm.inv_tran_ope_mtm);
});


router.get('/inv-mov', (req, res) => {
    res.json(inventoryMovment.inventoryMovment);
});


router.get('/inv-py', (req, res) => {
    res.json(inventoryPY.inventoryPY);
});


router.get('/inv-ct', (req, res) => {
    res.json(inventoryCT.inventoryCT);
});



router.get('/forex', (req, res) => {
    res.json(inventoryForex.inventoryForex);
});


module.exports = router;