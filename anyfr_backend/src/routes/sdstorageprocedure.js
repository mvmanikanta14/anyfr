const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper') 
const sdstorageprocedure = require('../controllers/sdstorageprocedure.controller');
const authenticateToken = require('../middlewares/authMiddleware');

const { validateEntity } = require("../utils/entityValidation");



router.post('/section-sp', authenticateToken, sdstorageprocedure.section);
router.post('/section-sp-que', authenticateToken, sdstorageprocedure.sectionQue
);

router.post('/section-sp-list', authenticateToken, sdstorageprocedure.sectionList
);

router.post('/section-sp-que-list', authenticateToken, sdstorageprocedure.sectionQueList
);

router.put('/section-sp-que-ans/:id', authenticateToken, sdstorageprocedure.section_que_res
);


module.exports = router;
