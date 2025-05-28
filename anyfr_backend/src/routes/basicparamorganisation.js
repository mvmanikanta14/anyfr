const express = require('express');
const router = express.Router();


const basicparamorganisation = require('../controllers/basicparamorganisation.controller');

 router.post('/create', basicparamorganisation.createorganisation);

 router.get('/list', basicparamorganisation.getAllorganisation);

module.exports = router;
