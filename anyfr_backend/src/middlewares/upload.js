const multer = require("multer");
const multerS3 = require("multer-s3");
const initializeS3 = require("../services/s3"); // Import the function to initialize S3 dynamically

const { getSubdomain } = require("../../subdomainHelper"); // Ensure correct path
const fs = require("fs");
const os = require("os");
const path = require("path");

const upload = (req, res, next) => {
    try {
        const s3 = initializeS3(req); // Initialize S3 per request
        console.log("✅ S3 Initialized for request");




        const HOME_DIR = os.homedir();
        const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
        const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
      
        const subdomain = getSubdomain(req);
        let configPath = subdomain === "localhost:3000" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;

        let subdomain_bucket = subdomain === "localhost:3000" ? "demo" : subdomain;
      
        if (!fs.existsSync(configPath)) {
          console.error(`❌ AWS-S3 config file not found: ${configPath}`);
          throw new Error("AWS-S3 configuration file missing");
        }
      
        const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      
        console.log("S3 config:",s3config);




        const storage = multerS3({
            s3: s3,
            bucket: s3config.b, // Ensure this is set correctly
            acl: "private",
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
           /*key: (req, file, cb) => {
                console.log("✅ File received for upload:", file.originalname);
                const fileName = `${subdomain_bucket}/profile_pictures/${Date.now()}_${file.originalname}`;
                cb(null, fileName);
            },
            */
            key: (req, file, cb) => {
              console.log("✅ File received for upload:", file.originalname);
              const sanitizedFileName = file.originalname.replace(/\s+/g, "_"); // Replace spaces
              cb(null, `${subdomain_bucket}/documents/${Date.now()}_${sanitizedFileName}`);
            }
        });

        //const uploadMiddleware = multer({ storage }).single("image"); // Ensure "image" matches Postman key
         // ✅ Increase File Size Limit (Set to 100MB)
         const uploadMiddleware = multer({
            storage,
            limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
        }).single("image"); // Ensure "image" matches Postman key


        uploadMiddleware(req, res, (err) => {
            if (err) {
                console.error("❌ Multer Processing Error:", err);
                return res.status(500).json({ success: false, message: "Multer failed to process file", error: err.message });
            }
            next(); // Continue to the next middleware
        });
    } catch (error) {
        console.error("❌ Error initializing multer upload:", error);
        res.status(500).json({ success: false, error: "Failed to configure file upload" });
    }
};

module.exports = upload;
