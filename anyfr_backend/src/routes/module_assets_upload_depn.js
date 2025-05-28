/*const express = require('express');
const router = express.Router();
const moduleAssetsDepnUploadController = require('../controllers/moduleAssetsDepnUpload.controller');
const authenticateToken = require('../middlewares/authMiddleware');
*/


const express = require('express');
const router = express.Router();
const controller = require('../controllers/moduleAssetsDepnUpload.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// Use the multer middleware before the controller
/*router.post(
  '/uploadexcelAssetsDepn',
  //authenticateToken,
 // moduleAssetsDepnUploadController.uploadExcelMulter,  // <-- Multer middleware
  moduleAssetsDepnUploadController.uploadexcelAssetsDepn
);
*/

/*
router.post(
  '/uploadexcelAssetsDepn',
  authenticateToken,
 // controller.uploadExcelMulter,      // ✅ First: multer middleware
  controller.uploadexcelAssetsDepn   // ✅ Then: controller
);
*/

router.get('/test', (req, res) => {
  res.send('Test route working!');
});


router.post(
  '/uploadexcelAssetsDepn',
  authenticateToken,
  controller.uploadExcelMulter,      // 🟢 multer runs first
  controller.uploadexcelAssetsDepn   // 🟢 then your logic runs
);



module.exports = router;
