const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { s3 } = require('../../services/s3Client');
const excelQueue = require('../../queue/queue');

// const upload = multer({ storage: multer.memoryStorage() });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  }
});


const uploadexcelAssetsDepn = async (req, res) => {
  try {
    console.log("ssssss",req)
     const organisation_id = req.user.org_id; 
     const entity_id =  req.body.entity_id; // This is how you get entity_id;
     const created_by =  req.user.user_id;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const fileKey = `assetsDepn/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;

    await s3.putObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    }).promise();

    // Skip queue if Redis not installed
     await excelQueue.add('processAssetsDepnExcel', { fileKey, module: 'assetsDepn',
  organisation_id: organisation_id,
  entity_id: entity_id,
  created_by: created_by });

    return res.status(201).json({ message: 'File uploaded and processing started', fileKey });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  uploadexcelAssetsDepn,
  uploadExcelMulter: upload.single('excel_file')
};
