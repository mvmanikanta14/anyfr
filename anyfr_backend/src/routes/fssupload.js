const express = require('express');
const router = express.Router();
const fssupload = require('../controllers/fssupload.controller');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Use the "file" key in your Postman form-data
// router.post('/upload', authenticateToken, upload.any(), fssupload.uploadexcel);

router.post('/upload', authenticateToken , upload.any(), (req, res, next) => {
    console.log('req.files:', req.files); // Log all files
    console.log('req.body:', req.body);   // Log other form data
    next();
  }, fssupload.uploadexcel);

module.exports = router;
