const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { s3 } = require('../../services/s3Client');
const excelQueue = require('../../queue/queue');
const { v4: uuidv4 } = require("uuid");

// const upload = multer({ storage: multer.memoryStorage() });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  }
});


const uploadTb = async (req, res) => {
  try {
    console.log("ssssss",req)
     const organisation_id = req.user.org_id; 
     const entity_id =  req.body.entity_id; // This is how you get entity_id;
     const created_by =  req.user.user_id;
     const period_id = req.body.period_id;
     const batch_name = req.body.batch_name;
     const location_id = req.body.location_id;
     const batch_type = "TB";
     const is_loaded =0;
     const uniqueSuffix = uuidv4().replace(/-/g, "").substring(0, 8); // or use timestamp
     const tmp_tblname = `tmp_tb_excel_${organisation_id}_${entity_id}_${uniqueSuffix}`; // final name
    
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const fileKey = `tb_daybook/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;

    await s3.putObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    }).promise();

    // Skip queue if Redis not installed
     await excelQueue.add('processTBExcel', { fileKey, module: 'TBExcel',
  organisation_id: organisation_id,
  entity_id: entity_id,
  created_by: created_by,
  period_id: period_id,
  batch_name: batch_name,
  location_id: location_id,
  batch_type: batch_type,
  is_loaded:is_loaded,
  tmp_tblname:tmp_tblname

 });
 


    return res.status(201).json({ message: 'File uploaded successfully!', fileKey });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

const uploadDb = async (req, res) => {
  try {
    console.log("qqqq",req)
     const organisation_id = req.user.org_id; 
     const entity_id =  req.body.entity_id; // This is how you get entity_id;
     const created_by =  req.user.user_id;
     const period_id = req.body.period_id;
     const batch_name = req.body.batch_name;
     const location_id = req.body.location_id;
     const batch_type = "DB";
     const is_loaded =0;
     const uniqueSuffix = uuidv4().replace(/-/g, "").substring(0, 8); // or use timestamp
     const tmp_tblname = `tmp_db_excel_${organisation_id}_${entity_id}_${uniqueSuffix}`; // final name
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const fileKey = `tb_daybook/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;

    await s3.putObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    }).promise();

    // Skip queue if Redis not installed
     await excelQueue.add('processDBExcel', { fileKey, module: 'DBExcel',
  organisation_id: organisation_id,
  entity_id: entity_id,
  created_by: created_by,
  period_id: period_id,
  batch_name: batch_name,
  location_id: location_id,
  batch_type: batch_type,
  is_loaded:is_loaded,
  tmp_tblname:tmp_tblname
 });


    return res.status(201).json({ message: 'File uploaded successfully!', fileKey });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  uploadTb,
  uploadDb,
  uploadExcelMulter: upload.single('excel_file')
};
