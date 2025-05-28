/*const express = require('express');
const router = express.Router();
const moduleAssetsDepnUploadController = require('../controllers/moduleAssetsDepnUpload.controller');
const authenticateToken = require('../middlewares/authMiddleware');
*/


const express = require('express');
const router = express.Router();
const controller = require('../controllers/dataTbDbUpload.controller');
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/test', (req, res) => {
  res.send('Test route working!');
});


router.post(
  '/uploadexceltb',
  authenticateToken,
  controller.uploadExcelMulter,      // 🟢 multer runs first
  controller.uploadTb   // 🟢 then your logic runs
);


router.post(
  '/uploadexceldb',
  authenticateToken,
  controller.uploadExcelMulter,      // 🟢 multer runs first
  controller.uploadDb  // 🟢 then your logic runs
);




module.exports = router;
