const { S3Service } = require('../services/s3Service');
const PdfService = require('../services/pdfService');
const EmailService = require('../services/emailService');
// const { ChartService } = require('../services/chartService');
const logger = require('../utils/logger');
const { getConfig } = require('../config/config');
const PDFDocument = require('pdfkit');

class DocumentsController {
    constructor() {
        this.s3Service = new S3Service(getConfig());
        this.pdfService = new PdfService();
        this.locationService = new LocationService();
        this.emailService = new EmailService();
        // this.chartService = new ChartService();
    }

    // Add this method to src/controllers/documentsController.js

    async sendSms(req, res) {
        try {
            const { phoneNumber, message } = req.body;

            if (!phoneNumber || !message) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number and message are required"
                });
            }

            // Initialize AWS Pinpoint client
            const pinpoint = new AWS.Pinpoint({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                }
            });

            const params = {
                ApplicationId: process.env.PINPOINT_APPLICATION_ID,
                MessageRequest: {
                    Addresses: {
                        [phoneNumber]: {
                            ChannelType: 'SMS'
                        }
                    },
                    MessageConfiguration: {
                        SMSMessage: {
                            Body: message,
                            MessageType: 'TRANSACTIONAL',
                            OriginationNumber: process.env.SMS_ORIGINATION_NUMBER
                        }
                    }
                }
            };

            const result = await pinpoint.sendMessages(params).promise();

            // Log the SMS details
            logger.info('SMS sent successfully', {
                phoneNumber,
                messageId: result.MessageResponse.Result[phoneNumber].MessageId
            });

            // Save SMS details to database if needed
            await req.models.SmsLogs.create({
                phone_number: phoneNumber,
                message: message,
                status: 'sent',
                message_id: result.MessageResponse.Result[phoneNumber].MessageId,
                user_id: req.user.id
            });

            return  res.json({
                success: true,
                message: "SMS sent successfully",
                data: {
                    messageId: result.MessageResponse.Result[phoneNumber].MessageId,
                    deliveryStatus: result.MessageResponse.Result[phoneNumber].DeliveryStatus
                }
            });

        } catch (error) {
            logger.error('Send SMS error:', error);

            // Save failed SMS attempt to database if needed
            await req.models.SmsLogs.create({
                phone_number: req.body.phoneNumber,
                message: req.body.message,
                status: 'failed',
                error_message: error.message,
                user_id: req.user.id
            });

            return  res.status(500).json({
                success: false,
                error: error.message || "Failed to send SMS"
            });
        }
    }


    async uploadPdf(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            const key = `pdfs/${Date.now()}-${req.file.originalname}`;
            await this.s3Service.uploadFile(req.file, key);
            const url = await this.s3Service.getSignedUrl(key);

            const document = await req.models.DocumentsRaw.create({
                document_type: "pdf",
                document_name: req.file.originalname,
                document_path: url,
                user_id: req.user.id
            });

            return  res.json({ success: true, data: document });
        } catch (error) {
            logger.error('Upload PDF error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async generatePdf(req, res) {
        // try {
        //     const { content } = req.body;
        //     const pdfBuffer = await this.pdfService.generatePdf(content);
        //
        //     const key = `generated-pdfs/${Date.now()}.pdf`;
        //     await this.s3Service.uploadFile(
        //         { buffer: pdfBuffer, mimetype: 'application/pdf' },
        //         key
        //     );
        //
        //     const url = await this.s3Service.getSignedUrl(key);
        //     return res.json({ success: true, url });
        // } catch (error) {
        //     logger.error('Generate PDF error:', error);
        //     return res.status(500).json({ success: false, error: error.message });
        // }

        try {

            // const subdomain = getSubdomain(req); //  Extract subdomain dynamically
            // console.log("🔍 Debug: Checking `req.models` inside route.");
            // console.log(req.models); // Log models to verify if they are present

            // const GeolocationRawInstance = new req.models.GeolocationRaw.constructor(subdomain);
            // console.log("✅ Debug: Class instance created successfully");
            //
            // if (!req.models || !req.models.GeolocationRaw) {
            //     return res.status(500).json({ error: "❌ Models not initialized properly." });
            // }

            const { page = 1, limit = 10 } = req.query;
            const rows = await req.models.GeolocationRaw.getAll(parseInt(page), parseInt(limit));

            // Set headers for PDF download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=geo_locations_report.pdf');

            // Create a new PDF document
            const doc = new PDFDocument();
            doc.pipe(res);

            // Add a title
            doc.fontSize(25).text('Geo Locations Report', { align: 'center' });
            doc.moveDown();

            // Add data to the PDF. Adjust fields based on your table structure.
            if (rows && rows.length > 0) {
                rows.forEach(item => {
                    doc.fontSize(14).text(`ID: ${item.id}`);
                    Object.keys(item).forEach(key => {
                        if (key !== 'id') {
                            doc.text(`${key}: ${item[key]}`);
                        }
                    });
                    doc.moveDown();
                });
            } else {
                doc.fontSize(14).text('No data found.');
            }

            // Finalize the PDF and end the stream
            doc.end();
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Error generating PDF');
        }
    }

    async downloadPdf(req, res) {
        try {
            const document = await req.models.DocumentsRaw.getLatestPdf(req.user.id);

            if (!document) {
                return res.status(404).json({ success: false, message: "Document not found" });
            }

            const pdfBuffer = await this.pdfService.downloadPdf(document.document_path);
            return  res.setHeader('Content-Type', 'application/pdf');
            return  res.setHeader('Content-Disposition', `attachment; filename="${document.document_name}"`);
            return  res.send(pdfBuffer);
        } catch (error) {
            logger.error('Download PDF error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getLatestPdf(req, res) {
        try {

            const latestDocument = await req.models.DocumentsRaw.getLatestPdf(req.user.id);

            if (!latestDocument || !latestDocument.document_path) {
                return res.status(404).json({
                    success: false,
                    message: "No PDF found"
                });
            }

            // Parse the document path to get S3 key
            const urlParts = new URL(latestDocument.document_path);
            const objectKey = decodeURIComponent(urlParts.pathname.substring(1));

            if (!objectKey) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid document path"
                });
            }

            const signedUrl = await this.s3Service.getSignedUrl(objectKey);

            // Encrypt the signed URL for additional security
            const encryptedSignedUrl = Buffer.from(signedUrl).toString("base64");

            // Log the access
            logger.info('PDF accessed', {
                userId: req.user.id,
                documentId: latestDocument.id,
                documentName: latestDocument.document_name
            });

            // Save access log if needed
            await req.models.DocumentAccessLogs.create({
                user_id: req.user.id,
                document_id: latestDocument.id,
                access_type: 'view',
                ip_address: req.ip
            });

            return res.json({
                success: true,
                data: {
                    document_name: latestDocument.document_name,
                    document_id: latestDocument.id,
                    created_at: latestDocument.created_at,
                    updated_at: latestDocument.updated_at,
                    signedUrl: encryptedSignedUrl
                }
            });

        } catch (error) {
            logger.error('Get latest PDF error:', error);
            return  res.status(500).json({
                success: false,
                error: error.message || "Failed to retrieve latest PDF"
            });
        }
    }

    async saveGeoLocation(req, res) {
        try {
            // ✅ Check if `req.models` is correctly set
            if (!req.models || !req.models.GeolocationRaw) {
                return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
            }
           const userId = req.user.id;
            const document = await req.models.GeolocationRaw.save({
               latitude: req.body.latitude,
               longitude:  req.body.longitude,
               user_id: userId
           });

           res.status(201).json({ status: true, message: "saved successfully", data: document });
        } catch (err) {
            console.error("❌ Error in /create:", err);
            res.status(500).json({ error: err.message });
        }
    }

    async locationHistory(req, res) {
        try {
            // ✅ Check if `req.models` is correctly set
            if (!req.models || !req.models.basicMasterUsersRaw) {
                return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
            }


            if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
                return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
            }
            const GeolocationRawInstance = new req.models.GeolocationRaw.constructor(subdomain);
            console.log("✅ Debug: Class instance created successfully");


            if (!req.models || !req.models.GeolocationRaw) {
                return res.status(500).json({ error: "❌ Models not initialized properly." });
            }

            const { page = 1, limit = 10 } = req.query;
            const users = await GeolocationRawInstance.getAll(parseInt(page), parseInt(limit));
            res.json({ status: true, message: "Users location successfully", data: users });
        } catch (err) {
            console.error("❌ Error in /view:", err);
            res.status(500).json({ error: err.message });
        }
    }

    async sendEmail(req, res) {
        try {
        // Send the email
            let info = await this.emailService.sendEmail(req.body.fromemail, 'Test Email from Node.js', '<h1>Hello,</h1><p>This is a test email sent from Node.js using <strong>Gmail</strong>!</p>');
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Email sent successfully.');
      } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email.');
      }
    }

    async generateChart(req, res) {
        const data = [
          { label: 'January', value: 40 },
          { label: 'February', value: 55 },
          { label: 'March', value: 30 },
          { label: 'April', value: 70 },
          { label: 'May', value: 20 }
        ];
        return res.json(data);
    }

    async uploadAudio(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            if (!req.file.mimetype.startsWith('audio/')) {
                return res.status(400).json({ success: false, message: "Invalid file type. Only audio files are allowed." });
            }

            const key = `audio/${Date.now()}-${req.file.originalname}`;
            await this.s3Service.uploadFile(req.file, key);
            const url = await this.s3Service.getSignedUrl(key);

            const document = await req.models.DocumentsRaw.create({
                document_type: "audio",
                document_name: req.file.originalname,
                document_path: url,
                user_id: req.user.id
            });

            return  res.json({ success: true, data: document });
        } catch (error) {
            logger.error('Upload audio error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getLatestAudio(req, res) {
        try {
                const latestAudio = await req.models.DocumentsRaw.getlatestaudio(req.user.id);

            if (!latestAudio) {
                return res.status(404).json({ success: false, message: "No audio found" });
            }

            const signedUrl = await this.s3Service.getSignedUrl(latestAudio.document_path);
            return  res.json({
                success: true,
                data: {
                    document_name: latestAudio.document_name,
                    signedUrl
                }
            });
        } catch (error) {
            logger.error('Get latest audio error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async uploadVideo(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            if (!req.file.mimetype.startsWith('video/')) {
                return res.status(400).json({ success: false, message: "Invalid file type. Only video files are allowed." });
            }

            const key = `videos/${Date.now()}-${req.file.originalname}`;
            await this.s3Service.uploadFile(req.file, key);
            const url = await this.s3Service.getSignedUrl(key);

            const document = await req.models.DocumentsRaw.create({
                document_type: "video",
                document_name: req.file.originalname,
                document_path: url,
                user_id: req.user.id
            });

            return  res.json({ success: true, data: document });
        } catch (error) {
            logger.error('Upload video error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getLatestVideo(req, res) {
        try {
            const latestVideo = await req.models.DocumentsRaw.findOne({
                where: {
                    user_id: req.user.id,
                    document_type: 'video'
                },
                order: [['created_at', 'DESC']]
            });

            if (!latestVideo) {
                return res.status(404).json({ success: false, message: "No video found" });
            }

            const signedUrl = await this.s3Service.getSignedUrl(latestVideo.document_path);
            return  res.json({
                success: true,
                data: {
                    document_name: latestVideo.document_name,
                    signedUrl
                }
            });
        } catch (error) {
            logger.error('Get latest video error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async uploadYoutubeLink(req, res) {
        try {
            const { title, url } = req.body;

            if (!url || !url.includes('youtube.com')) {
                return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
            }

            const document = await req.models.DocumentsRaw.uploadyoutubelink({
                document_type: "youtube",
                document_name: title || url,
                document_path: url,
                user_id: req.user.id
            });

            return  res.json({ success: true, data: document });
        } catch (error) {
            logger.error('Upload YouTube link error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getLatestYoutube(req, res) {
        try {
            const latestYoutube = await req.models.DocumentsRaw.getlatestyoutube(req.user.id);

            if (!latestYoutube) {
                return res.status(404).json({ success: false, message: "No YouTube link found" });
            }

            return  res.json({
                success: true,
                data: {
                    document_name: latestYoutube.document_name,
                    url: latestYoutube.document_path
                }
            });
        } catch (error) {
            logger.error('Get latest YouTube error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async uploadExcel(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            const validMimeTypes = [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];

            if (!validMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ success: false, message: "Invalid file type. Only Excel files are allowed." });
            }

            const key = `excel/${Date.now()}-${req.file.originalname}`;
            await this.s3Service.uploadFile(req.file, key);
            const url = await this.s3Service.getSignedUrl(key);

            const document = await req.models.DocumentsRaw.create({
                document_type: "excel",
                document_name: req.file.originalname,
                document_path: url,
                user_id: req.user.id
            });

            return  res.json({ success: true, data: document });
        } catch (error) {
            logger.error('Upload Excel error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getSheetData(req, res) {
        try {
            const { documentId, sheetName } = req.body;
            const document = await req.models.DocumentsRaw.getSheet(documentId);

            if (!document) {
                return res.status(404).json({ success: false, message: "Document not found" });
            }

            const workbook = XLSX.readFile(document.document_path);
            const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet);

            return  res.json({ success: true, data });
        } catch (error) {
            logger.error('Get sheet data error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async getSheets(req, res) {
        try {
            const { documentId } = req.body;
            const document = await req.models.DocumentsRaw.getSheets(documentId);

            if (!document) {
                return res.status(404).json({ success: false, message: "Document not found" });
            }

            const workbook = XLSX.readFile(document.document_path);
            return  res.json({ success: true, data: workbook.SheetNames });
        } catch (error) {
            logger.error('Get sheets error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async saveToDb(req, res) {
        try {
            const { documentId, sheetName, tableName } = req.body;
            const document = await req.models.DocumentsRaw.findById(documentId);

            if (!document) {
                return res.status(404).json({ success: false, message: "Document not found" });
            }

            const workbook = XLSX.readFile(document.document_path);
            const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet);

            // Assuming you have a database service or ORM
            await req.models[tableName].bulkCreate(data);

            return  res.json({ success: true, message: "Data saved to database successfully" });
        } catch (error) {
            logger.error('Save to DB error:', error);
            return  res.status(500).json({ success: false, error: error.message });
        }
    }

    async proxyPdf(req, res) {
        try {
            const { url } = req.query;
            // const pdfBuffer = await this.pdfService.proxyPdf(url);
            const pdfBuffer = await this.pdfService.proxyPdf(url)
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            return res.send(pdfBuffer);
        } catch (error) {
            logger.error('Proxy PDF error:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }


}

module.exports = new DocumentsController();
