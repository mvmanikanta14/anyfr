const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documents.controller');
const authenticateToken = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/upload');

// PDF routes
router.post("/uploadpdf", authenticateToken, uploadMiddleware, documentsController.uploadPdf);
router.get("/latestpdf", authenticateToken, documentsController.getLatestPdf);
router.get("/download-pdf", authenticateToken, documentsController.downloadPdf);
router.get("/proxy-pdf", authenticateToken, documentsController.proxyPdf);
router.post("/generate-pdf", authenticateToken, documentsController.generatePdf);

// Audio routes
router.post("/uploadaudio", authenticateToken, uploadMiddleware, documentsController.uploadAudio);
router.get("/latestaudio", authenticateToken, documentsController.getLatestAudio);

// Video routes
router.post("/uploadvideo", authenticateToken, uploadMiddleware, documentsController.uploadVideo);
router.get("/latestvideo", authenticateToken, documentsController.getLatestVideo);

// YouTube routes
router.post('/uploadyoutubelink', authenticateToken, documentsController.uploadYoutubeLink);
router.get("/latestyoutube", authenticateToken, documentsController.getLatestYoutube);

// Excel routes
router.post("/uploadexcel", authenticateToken, uploadMiddleware, documentsController.uploadExcel);
router.post('/get-sheet-data', authenticateToken, documentsController.getSheetData);
router.post("/save-to-db", authenticateToken, documentsController.saveToDb);
router.post("/get-sheets", authenticateToken, documentsController.getSheets);

// Location routes
router.post("/savegeolocation", authenticateToken, documentsController.saveGeoLocation);
router.get("/locationhistory", authenticateToken, documentsController.locationHistory);

// Email and SMS routes
router.post("/send-email", authenticateToken, documentsController.sendEmail);
router.post("/send-sms", authenticateToken, documentsController.sendSms);

// Chart route
router.post("/chart", authenticateToken, documentsController.generateChart);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { getSubdomain } = require('../../subdomainHelper');
// const authenticateToken = require('../middlewares/authMiddleware');
// const uploadMiddleware = require('../middlewares/upload');
// const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");
// const nodemailer = require('nodemailer');
// const PDFDocument = require('pdfkit');
// const https = require("https");
// const http = require("http");
// //const router = express.Router();
// const url = require("url");
//
// const XLSX = require('xlsx');
// const { Pool } = require('pg');
//
// const axios = require('axios');
//
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
//
// const HOME_DIR = os.homedir();
// const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
// const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
//
//
// async function sendSMS(sms_content, mobile) {
//     // Prepare the SMS text by trimming and encoding it
//     const sms_text = encodeURIComponent(sms_content.trim());
//
//     // Construct the API URL with query parameters
//     const api_url = `https://sms.zestwings.com/smpp.sms?username=sadhguru&password=7890223&to=${mobile}&from=SAGSOL&text=${sms_text}&templateid=1707162835030221113`;
//
//     try {
//       // Send a GET request with a 5-second timeout
//       const response = await axios.get(api_url, { timeout: 5000 });
//       console.log('SMS sent successfully:', response.data);
//     } catch (error) {
//       // Handle errors (timeout, network issues, etc.)
//       console.error('Error sending SMS:', error.message);
//     }
//   }
//
// router.post('/sendsms', async (req, res) => {
//     try {
//         const mobile = "91" + req.body.mobile;
//
//         sms_content = 'Your OTP for login to anyaudit.in is 5555. Please enter otp and click submit. AnyAudit . Sadhguru';
//         sendSMS(sms_content, mobile);
//         res.json({ success: true, message: "SMS Sent successfully", data: mobile });
//     } catch (err) {
//         console.error("❌ Error in /create:", err);
//         res.status(500).json({ error: err.message });
//     }
// });
//
// router.post("/uploadpdf", authenticateToken, uploadMiddleware, async (req, res) => {
//     try {
//         console.log("✅ Route /uploadpdf hit successfully");
//
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }
//
//         if (req.file.mimetype !== "application/pdf") {
//             return res.status(400).json({ success: false, message: "Invalid file type. Only PDF files are allowed." });
//         }
//
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//         const documentUrl = req.file.location;
//
//         const userId = req.user.id;
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//         const document = await DocumentsRawInstance.create({
//             document_type: "pdf",
//             document_name: req.file.originalname,
//             document_path: documentUrl,
//             user_id: userId
//         });
//
//         res.json({ success: true, message: "PDF uploaded successfully", data: document });
//     } catch (error) {
//         console.error("❌ Error uploading PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
// router.post("/uploadaudio", authenticateToken, uploadMiddleware, async (req, res) => {
//     try {
//         console.log("✅ Route /uploadpdf hit successfully");
//
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }
//
//         // ✅ Allowed audio file types
//         const allowedAudioTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
//
//         // ✅ Validate file type
//         if (!allowedAudioTypes.includes(req.file.mimetype)) {
//             return res.status(400).json({ success: false, message: "Invalid file type. Only MP3, WAV, and OGG files are allowed." });
//         }
//
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//         const documentUrl = req.file.location;
//
//         const userId = req.user.id;
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//         const document = await DocumentsRawInstance.create({
//             document_type: "audio",
//             document_name: req.file.originalname,
//             document_path: documentUrl,
//             user_id: userId
//         });
//
//         res.json({ success: true, message: "PDF uploaded successfully", data: document });
//     } catch (error) {
//         console.error("❌ Error uploading PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
//
//
//
// router.post("/uploadvideo", authenticateToken, uploadMiddleware, async (req, res) => {
//     try {
//         console.log("✅ Route /uploadpdf hit successfully");
//
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }
//
//         // ✅ Allowed audio file types
//         const allowedAudioTypes =["video/mp4", "video/mkv", "video/webm", "video/avi"];
//
//         // ✅ Validate file type
//         if (!allowedAudioTypes.includes(req.file.mimetype)) {
//             return res.status(400).json({ success: false, message: "Invalid file type. ." });
//         }
//
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//         const documentUrl = req.file.location;
//
//         const userId = req.user.id;
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//         const document = await DocumentsRawInstance.create({
//             document_type: "video",
//             document_name: req.file.originalname,
//             document_path: documentUrl,
//             user_id: userId
//         });
//
//         res.json({ success: true, message: "Video uploaded successfully", data: document });
//     } catch (error) {
//         console.error("❌ Error uploading PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
//
// /*router.get("/latestpdf", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getLatestPdf(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No PDF found" });
//         }
//
//         res.json({ success: true, data: latestDocument });
//     } catch (error) {
//         console.error("❌ Error fetching latest PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
// */
//
// /*router.get("/latestpdf", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getLatestPdf(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No PDF found" });
//         }
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const objectKey = latestDocument.document_path.split("s3.amazonaws.com/")[1];
//         const command = new GetObjectCommand({
//             Bucket: s3config.b,
//             Key: objectKey,
//         });
//
//         const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
//
//         res.json({ success: true, data: { document_name: latestDocument.document_name, signedUrl } });
//     } catch (error) {
//         console.error("❌ Error fetching latest PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
// */
//
//
// router.get("/latestpdf", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getLatestPdf(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No PDF found" });
//         }
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const urlParts = new URL(latestDocument.document_path);
//         const objectKey = decodeURIComponent(urlParts.pathname.substring(1));
//
//         if (!objectKey) {
//             return res.status(400).json({ success: false, message: "Invalid document path" });
//         }
//
//         const command = new GetObjectCommand({
//             Bucket: s3config.b,
//             Key: objectKey,
//         });
//
//         const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
//         const encryptedSignedUrl = Buffer.from(signedUrl).toString("base64");
//
//         res.json({ success: true, data: { document_name: latestDocument.document_name, signedUrl: encryptedSignedUrl } });
//     } catch (error) {
//         console.error("❌ Error fetching latest PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
//
//
// router.get("/latestaudio", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getlatestaudio(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No PDF found" });
//         }
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const urlParts = new URL(latestDocument.document_path);
//         const objectKey = decodeURIComponent(urlParts.pathname.substring(1));
//
//         if (!objectKey) {
//             return res.status(400).json({ success: false, message: "Invalid document path" });
//         }
//
//         const command = new GetObjectCommand({
//             Bucket: s3config.b,
//             Key: objectKey,
//         });
//
//         const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
//         const encryptedSignedUrl = Buffer.from(signedUrl).toString("base64");
//
//         res.json({ success: true, data: { document_name: latestDocument.document_name, signedUrl: encryptedSignedUrl } });
//     } catch (error) {
//         console.error("❌ Error fetching latest PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
// router.get("/latestvideo", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getlatestvideo(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No video found" });
//         }
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const urlParts = new URL(latestDocument.document_path);
//         const objectKey = decodeURIComponent(urlParts.pathname.substring(1));
//
//         if (!objectKey) {
//             return res.status(400).json({ success: false, message: "Invalid document path" });
//         }
//
//         const command = new GetObjectCommand({
//             Bucket: s3config.b,
//             Key: objectKey,
//         });
//
//         const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
//         const encryptedSignedUrl = Buffer.from(signedUrl).toString("base64");
//
//         res.json({ success: true, data: { document_name: latestDocument.document_name, signedUrl: encryptedSignedUrl } });
//     } catch (error) {
//         console.error("❌ Error fetching latest PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
//
// router.get("/downloadpdf", authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//
//         const latestDocument = await DocumentsRawInstance.getLatestPdf(req.user.id);
//
//         if (!latestDocument || !latestDocument.document_path) {
//             return res.status(404).json({ success: false, message: "No PDF found" });
//         }
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const urlParts = new URL(latestDocument.document_path);
//         const objectKey = decodeURIComponent(urlParts.pathname.substring(1));
//
//         if (!objectKey) {
//             return res.status(400).json({ success: false, message: "Invalid document path" });
//         }
//
//         const command = new GetObjectCommand({
//             Bucket: s3config.b,
//             Key: objectKey,
//         });
//
//         const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
//         const encryptedSignedUrl = Buffer.from(signedUrl).toString("base64");
//
//         res.json({ success: true, data: { document_name: latestDocument.document_name, downloadUrl: encryptedSignedUrl } });
//     } catch (error) {
//         console.error("❌ Error generating download link:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
//
// // ✅ Create new user
// router.post('/uploadyoutubelink',authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
//         console.log("🔍 Debug: Checking `req.models` inside route.");
//         console.log(req.models); // Log models to verify if they are present
//
//         if (!req.models || Object.keys(req.models).length === 0) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//           // ✅ Check if `req.models` is correctly set
//           if (!req.models || !req.models.basicMasterUsersRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
//         }
//
//
//         if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
//             return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
//         }
//
//
//        const userId = req.user.id;
//
//        const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//        const document = await DocumentsRawInstance.uploadyoutubelink({
//             document_type: "youtube",
//             document_name:  req.body.title,
//             document_path:  req.body.link,
//             user_id: userId
//         });
//
//
//         res.status(201).json({ status: true, message: "You Link created successfully", data: document });
//     } catch (err) {
//         console.error("❌ Error in /create:", err);
//         res.status(500).json({ error: err.message });
//     }
// });
// router.get("/latestyoutube", authenticateToken, async (req, res) => {
//     try {
//
//         const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
//         console.log("🔍 Debug: Checking `req.models` inside route.");
//         console.log(req.models); // Log models to verify if they are present
//
//         if (!req.models || Object.keys(req.models).length === 0) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//           // ✅ Check if `req.models` is correctly set
//           if (!req.models || !req.models.basicMasterUsersRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
//         }
//
//
//
//         const basicMasterUsersRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//         console.log("✅ Debug: Class instance created successfully");
//
//
//
//
//         const userId = req.user.id;
//         const docs = await basicMasterUsersRawInstance.getlatestyoutube(userId);
//         res.json({ status: true, message: "Data fetched successfully", data: docs });
//     } catch (err) {
//         console.error("❌ Error in /view:", err);
//         res.status(500).json({ error: err.message });
//     }
//
// });
//
// // ✅ Create new user
// router.post('/savegeolocation',authenticateToken, async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
//         console.log("🔍 Debug: Checking `req.models` inside route.");
//         console.log(req.models); // Log models to verify if they are present
//
//         if (!req.models || Object.keys(req.models).length === 0) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//           // ✅ Check if `req.models` is correctly set
//           if (!req.models || !req.models.GeolocationRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
//         }
//
//        const userId = req.user.id;
//
//        const GeolocationRawInstance = new req.models.GeolocationRaw.constructor(subdomain);
//        const document = await GeolocationRawInstance.save({
//             latitude: req.body.latitude,
//             longitude:  req.body.longitude,
//             user_id: userId
//         });
//
//
//         res.status(201).json({ status: true, message: "saved successfully", data: document });
//     } catch (err) {
//         console.error("❌ Error in /create:", err);
//         res.status(500).json({ error: err.message });
//     }
// });
//
//
// // ✅ View all users (Paginated)
// router.get('/locationhistory', async (req, res) => {
//     try {
//
//         const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
//         console.log("🔍 Debug: Checking `req.models` inside route.");
//         console.log(req.models); // Log models to verify if they are present
//
//         if (!req.models || Object.keys(req.models).length === 0) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//           // ✅ Check if `req.models` is correctly set
//           if (!req.models || !req.models.basicMasterUsersRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
//         }
//
//
//         if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
//             return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
//         }
//         const GeolocationRawInstance = new req.models.GeolocationRaw.constructor(subdomain);
//         console.log("✅ Debug: Class instance created successfully");
//
//
//         if (!req.models || !req.models.GeolocationRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//         const { page = 1, limit = 10 } = req.query;
//         const users = await GeolocationRawInstance.getAll(parseInt(page), parseInt(limit));
//         res.json({ status: true, message: "Users location successfully", data: users });
//     } catch (err) {
//         console.error("❌ Error in /view:", err);
//         res.status(500).json({ error: err.message });
//     }
// });
//
// router.get("/proxy-pdf", async (req, res) => {
//     try {
//         const signedUrl = req.query.url; // Get the signed URL from query params
//
//         if (!signedUrl) {
//             return res.status(400).json({ error: "Missing signed PDF URL" });
//         }
//
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//         res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//
//         const parsedUrl = url.parse(signedUrl);
//         const client = parsedUrl.protocol === "https:" ? https : http;
//
//         // Fetch the PDF from the signed S3 URL
//         client.get(signedUrl, (s3Res) => {
//             if (s3Res.statusCode !== 200) {
//                 return res.status(s3Res.statusCode).json({ error: "Failed to fetch PDF" });
//             }
//
//             //res.setHeader("Content-Type", "application/pdf");
//             res.setHeader("Content-Type", "application/pdf");
//             res.setHeader("X-Frame-Options", "ALLOWALL"); // ✅ Allow iframes
//
//             s3Res.pipe(res); // Stream the PDF directly to the frontend
//         }).on("error", (err) => {
//             console.error("Error fetching PDF:", err);
//             res.status(500).json({ error: "Error fetching PDF" });
//         });
//     } catch (error) {
//         console.error("Error proxying PDF:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
//
//
// // Simple bar graph data endpoint
// router.get('/chart', (req, res) => {
//     // Example data: labels and corresponding values
//     const data = [
//       { label: 'January', value: 40 },
//       { label: 'February', value: 55 },
//       { label: 'March', value: 30 },
//       { label: 'April', value: 70 },
//       { label: 'May', value: 20 }
//     ];
//     res.json(data);
//   });
//
//   // Simple bar graph data endpoint
// router.post('/sendemail', async (req, res) => {
//
//      // Create a transporter using Gmail's SMTP service
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'authentication@anyaudit.in',       // Replace with your Gmail address
//       pass: 'Sagsol@123'           // Replace with your Gmail app-specific password
//     }
//   });
//
//   // Set up email options
//   let mailOptions = {
//     from: '"AnyFinanace" <authentication@anyaudit.in>',
//     to: req.body.fromemail,         // List of recipients separated by commas if needed
//     subject: 'Test Email from Node.js',
//     text: 'Hello, this is a test email sent from Node.js using Gmail!',
//     html: '<h1>Hello,</h1><p>This is a test email sent from Node.js using <strong>Gmail</strong>!</p>'
//   };
//
//   try {
//     // Send the email
//     let info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Email sent successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Error sending email.');
//   }
//
//   });
//
//
//
//   router.get('/generate-pdf', async (req, res) => {
//     try {
//
//         const subdomain = getSubdomain(req); //  Extract subdomain dynamically
//         console.log("🔍 Debug: Checking `req.models` inside route.");
//         console.log(req.models); // Log models to verify if they are present
//
//      /* const query = `
//         SELECT *
//         FROM geo_locations
//         ORDER BY id DESC
//       `;
//
//       // Use Sequelize to fetch data dynamically
//       const rows = await sequelize.query(query, {
//         type: Sequelize.QueryTypes.SELECT,
//       });
//       */
//
//       const GeolocationRawInstance = new req.models.GeolocationRaw.constructor(subdomain);
//         console.log("✅ Debug: Class instance created successfully");
//
//
//         if (!req.models || !req.models.GeolocationRaw) {
//             return res.status(500).json({ error: "❌ Models not initialized properly." });
//         }
//
//         const { page = 1, limit = 10 } = req.query;
//         const rows = await GeolocationRawInstance.getAll(parseInt(page), parseInt(limit));
//
//       // Set headers for PDF download
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'attachment; filename=geo_locations_report.pdf');
//
//       // Create a new PDF document
//       const doc = new PDFDocument();
//       doc.pipe(res);
//
//       // Add a title
//       doc.fontSize(25).text('Geo Locations Report', { align: 'center' });
//       doc.moveDown();
//
//       // Add data to the PDF. Adjust fields based on your table structure.
//       if (rows && rows.length > 0) {
//         rows.forEach(item => {
//           doc.fontSize(14).text(`ID: ${item.id}`);
//           Object.keys(item).forEach(key => {
//             if (key !== 'id') {
//               doc.text(`${key}: ${item[key]}`);
//             }
//           });
//           doc.moveDown();
//         });
//       } else {
//         doc.fontSize(14).text('No data found.');
//       }
//
//       // Finalize the PDF and end the stream
//       doc.end();
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       res.status(500).send('Error generating PDF');
//     }
//   });
//
//   const streamToBuffer = async (stream) => {
//     const chunks = [];
//     for await (const chunk of stream) {
//         chunks.push(chunk);
//     }
//     return Buffer.concat(chunks);
// };
//   router.post("/uploadexcel", authenticateToken, uploadMiddleware, async (req, res) => {
//     try {
//         console.log("✅ Route /uploadxlsx hit successfully");
//
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }
//
//         // ✅ Allowed audio file types
//         //const allowedAudioTypes =["video/mp4", "video/mkv", "video/webm", "video/avi"];
//
//         // ✅ Validate file type
//        // if (!allowedAudioTypes.includes(req.file.mimetype)) {
//        //     return res.status(400).json({ success: false, message: "Invalid file type. ." });
//        // }
//
//         const subdomain = getSubdomain(req);
//
//
//
//
//
//         const HOME_DIR = os.homedir();
// const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
// const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ AWS-S3 config file not found: ${configPath}`);
//             throw new Error("AWS-S3 configuration file missing");
//         }
//
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//         const documentUrl = req.file.location;
//
//         const userId = req.user.id;
//         /*const DocumentsRawInstance = new req.models.DocumentsRaw.constructor(subdomain);
//         const document = await DocumentsRawInstance.create({
//             document_type: "video",
//             document_name: req.file.originalname,
//             document_path: documentUrl,
//             user_id: userId
//         });
//         */
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         const fileUrl =documentUrl;// req.file.location;
//         const fileKey = fileUrl.split('.com/')[1];
//
//         try {
//             // Read file from S3
//             const params = { Bucket: s3config.b, Key: fileKey };
//             console.log("params", params);
//            /* const file = await s3.getObject(params).promise();
//             const workbook = XLSX.read(file.Body, { type: 'buffer' });
//
//             // Auto-select if only one sheet
//             const sheets = workbook.SheetNames;
//             const selectedSheet = sheets.length === 1 ? sheets[0] : null;
//
//             res.json({ message: "File uploaded successfully!", fileUrl, sheets, selectedSheet });
//             */
//
//                     // Fetch file from S3 using AWS SDK v3
//         const command = new GetObjectCommand(params);
//         const response = await s3.send(command);
//         const fileBuffer = await streamToBuffer(response.Body);
//
//         // Read the Excel file
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//
//         res.json({ sheets: workbook.SheetNames ,fileUrl:fileUrl});
//
//         } catch (error) {
//             res.status(500).json({ message: "Error processing file", error: error.message });
//         }
//
//
//
//
//
//         //res.json({ success: true, message: "Video uploaded successfully", data: document });
//     } catch (error) {
//         console.error("❌ Error uploading PDF:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
//
// // Step 2: Get Sheet Data and Allow Column Mapping
// router.post('/get-sheet-data', async (req, res) => {
//     const { fileUrl, sheetName } = req.body;
//     if (!fileUrl || !sheetName) return res.status(400).json({ message: "File URL and sheet name are required" });
//
//     try {
// // Predefined Columns (Modify as per database)
// const PREDEFINED_COLUMNS = ["font_name", "is_active"];
//
//         const subdomain = getSubdomain(req);
//
//
//         const HOME_DIR = os.homedir();
// const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
// const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
//
//
//
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//
//
//        // const subdomain = getSubdomain(req);
//         //let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//        // const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//
//
//         const fileKey = fileUrl.split('.com/')[1];
//
//         const params = { Bucket: s3config.b, Key: fileKey };
//
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//          // Fetch file from S3 using AWS SDK v3
//          const command = new GetObjectCommand(params);
//          const response = await s3.send(command);
//          const fileBuffer = await streamToBuffer(response.Body);
//
//          // Read the Excel file
//          const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//
//          if (!workbook.SheetNames.includes(sheetName)) {
//              return res.status(400).json({ message: "Sheet not found" });
//          }
//
//          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//
//          res.json({
//              predefinedColumns: PREDEFINED_COLUMNS,
//              sheetColumns: Object.keys(sheetData[0] || {}),
//              sampleData: sheetData.slice(0, 5) // Show only first 5 rows
//          });
//
//
//     } catch (error) {
//         res.status(500).json({ message: "Error reading sheet data", error: error.message });
//     }
// });
//
// // Step 3: Save Data to PostgreSQL
// router.post("/save-to-db", async (req, res) => {
//     const { fileUrl, sheetName, columnMapping } = req.body;
//
//     if (!fileUrl || !sheetName || !columnMapping) {
//         return res.status(400).json({ message: "Missing required data" });
//     }
//
//     try {
//         // Extract Subdomain
//         const subdomain = getSubdomain(req);
//
//         // Define Configuration Paths
//         const HOME_DIR = os.homedir();
//         const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
//         const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
//
//
//         const DEV_CONFIG_PATH_DB = path.join(HOME_DIR, "anyfinconfig", "demo.json");
//         const PROD_CONFIG_DIR_DB = "/usr/local/anyfinconfig/";
//
//         // Select Config Path Based on Environment
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//  let configPathDB= subdomain === "localhost:3000" ? DEV_CONFIG_PATH_DB : path.join(PROD_CONFIG_DIR_DB, `${subdomain}.json`);
//         // Validate Config Path
//         if (!fs.existsSync(configPath)) {
//             console.error(`❌ Database config file not found: ${configPath}`);
//             return res.status(500).json({ message: "Database configuration not found" });
//         }
//         if (!fs.existsSync(configPathDB)) {
//             console.error(`❌ Database config file not found: ${configPathDB}`);
//             return res.status(500).json({ message: "Database configuration not found" });
//         }
//
//         // Read S3 Configuration
//         const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//
//         // Extract S3 File Key
//         const fileKey = fileUrl.split(".com/")[1];
//
//         // Initialize AWS S3 Client
//         const s3 = new S3Client({
//             region: s3config.region,
//             credentials: {
//                 accessKeyId: s3config.a,
//                 secretAccessKey: s3config.s,
//             },
//         });
//
//         // Fetch File from S3
//         const params = { Bucket: s3config.b, Key: fileKey };
//         const command = new GetObjectCommand(params);
//         const response = await s3.send(command);
//         const fileBuffer = await streamToBuffer(response.Body);
//
//         // Read Excel File
//         const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//
//         if (!workbook.SheetNames.includes(sheetName)) {
//             return res.status(400).json({ message: "Sheet not found" });
//         }
//
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//
//         // Transform Data Based on Column Mapping
//         const transformedData = sheetData.map((row) => {
//             let mappedRow = {};
//             for (const [sourceColumn, targetColumn] of Object.entries(columnMapping)) {
//                 mappedRow[targetColumn] = row[sourceColumn] || null; // Ensure null safety
//             }
//             return mappedRow;
//         });
//
//         // ✅ Establish a Dynamic Database Connection for the Given Domain
//         const dbConfig = JSON.parse(fs.readFileSync(configPathDB, "utf-8"));
//
//         console.log(dbConfig);
//
//         const dynamicPool = new Pool({
//             user: dbConfig.user,
//             host: dbConfig.host,
//             database: dbConfig.database,
//             password: String(dbConfig.password), // Ensure password is always a string
//             port: dbConfig.port,
//         });
//
//         // Insert Data into PostgreSQL
//         const client = await dynamicPool.connect();
//         try {
//             for (let row of transformedData) {
//                 const columns = Object.keys(row);
//                 const values = Object.values(row);
//                 const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
//
//                 await client.query(
//                     `INSERT INTO basic_mast_fonts (${columns.join(", ")}) VALUES (${placeholders})`,
//                     values
//                 );
//             }
//             res.json({ message: "Data saved successfully!" });
//         } finally {
//             client.release();
//             await dynamicPool.end(); // Close the connection after execution
//         }
//     } catch (error) {
//         console.error("❌ Error saving data:", error);
//         res.status(500).json({ message: "Error saving data", error: error.message });
//     }
// });
//
//
// router.post("/get-sheets", async (req, res) => {
//     const { fileUrl } = req.body;
//
//     if (!fileUrl) {
//         return res.status(400).json({ message: "File URL is required" });
//     }
//
//     try {
//
//         const subdomain = getSubdomain(req);
//
//         // Define Configuration Paths
//         const HOME_DIR = os.homedir();
//         const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
//         const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
//
//
//         const DEV_CONFIG_PATH_DB = path.join(HOME_DIR, "anyfinconfig", "demo.json");
//         const PROD_CONFIG_DIR_DB = "/usr/local/anyfinconfig/";
//
//         // Select Config Path Based on Environment
//         let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
//
//   // Read S3 Configuration
//   const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
//         // Extract S3 file key
//         const fileKey = fileUrl.split(".com/")[1];
//         const params = { Bucket: s3config.b, Key: fileKey };
//   // Initialize AWS S3 Client
//   const s3 = new S3Client({
//     region: s3config.region,
//     credentials: {
//         accessKeyId: s3config.a,
//         secretAccessKey: s3config.s,
//     },
// });
//         // Fetch file from S3 using AWS SDK v3
//         const command = new GetObjectCommand(params);
//         const response = await s3.send(command);
//         const fileBuffer = await streamToBuffer(response.Body);
//
//         // Read the Excel file
//         const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//
//         res.json({ sheets: workbook.SheetNames });
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving file from S3", error: error.message });
//     }
// });
//
// module.exports = router;
