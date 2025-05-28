const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const os = require("os");
const path = require("path");
const fs = require("fs");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const SECRET_KEY = process.env.JWT_SECRET || 'Anyfin@123';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'AnyfinRefresh@123';

// Function to Generate Tokens
const generateAccessToken = (user) => jwt.sign({ id: user.id, email: user.email ,organisation_id: user.organisation_id , org_id: user.org_id , user_id : user.id}, SECRET_KEY, { expiresIn: '6h' });
const generateRefreshToken = (user) => jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

const login = async (req, res) => {
    try {
        // console.log("🔍 Debug: Checking ", req.models, " inside route.");
        if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ status: false, message: "Server Error: Models not initialized" });
        }

        const { username, password , organisation_id } = req.body;

        console.log("Debug: Received username =", username, "Received password =", password);

        if (!username || !password || !organisation_id) {
            return res.status(400).json({ status: false, message: "username and password are required" });
        }

        const user = await req.models.basicMasterUsersRaw.getUserByLoginId(username, organisation_id);

        console.log("Debug: User found =", user);

        if (!user) return res.status(401).json({ status: false, message: 'User Not Found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ status: false, message: 'Incorrect password' });

        const accessToken = generateAccessToken(user);
        return res.json({ status: true, message: 'Login successful', login_id : user.id, username :user.login_id,organisation_id : user.organisation_id,organisation_name : user.organisation_name, org_id: user.org_id,   token: accessToken });
    } catch (err) {
        console.error("❌ Error in /login:", err);
        return res.status(500).json({ status: false, message: err.message });
    }
}

const create = async (req, res) => {
    try {
        console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models);

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

        if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
        }

        if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
            return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
        }

        const user = await req.models.basicMasterUsersRaw.create(req.body);

        res.status(201).json({ status: true, message: "User created successfully", data: user });
    } catch (err) {
        console.error("❌ Error in /create:", err);
        res.status(500).json({ error: err.message });
    }
}

const editUser = async (req, res) => {
    try {
        if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }
        console.log("🔍 Debug: Checking inside route.", req.params, req.body);
        const user = await req.models.basicMasterUsersRaw.edit(req.params.id, req.body);
        res.json({ status: true, message: "User updated successfully", data: user });
    } catch (err) {
        console.error("❌ Error in editUser:", err);
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

        const user = await req.models.basicMasterUsersRaw.softDelete(req.params.id);
        res.json({ status: true, message: "User deactivated successfully", data: user });
    } catch (err) {
        console.error("❌ Error in deleteUser:", err);
        res.status(500).json({ error: err.message });
    }
};

const viewUsers = async (req, res) => {
    try {
        console.log("🔍 Debug: Checking `req.models` inside route.");

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

        if (!req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

        const { page = 1, limit = 10 } = req.query;
        const users = await req.models.basicMasterUsersRaw.getAll(parseInt(page), parseInt(limit));
        res.json({ status: true, message: "Users fetched successfully", data: users });
    } catch (err) {
        console.error("❌ Error in viewUsers:", err);
        res.status(500).json({ error: err.message });
    }
};

const uploadProfilePicture = async (req, res) => {
    try {
        console.log("✅ Route /uploadimage hit successfully");

        uploadMiddleware(req, res, async (err) => {
            if (err) {
                console.error("❌ Multer Upload Error:", err);
                return res.status(500).json({ success: false, message: "File upload failed", error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded" });
            }

            const fileUrl = req.file.location;
            console.log("✅ File uploaded successfully:", fileUrl);

            const userId = req.user.id;
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const updatedUser = await req.models.basicMasterUsersRaw.uploadimage(userId, { display_picture: fileUrl });

            res.json({ success: true, message: "Profile picture updated successfully", data: updatedUser });
        });
    } catch (error) {
        console.error("❌ Error uploading profile picture:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const user = await req.models.basicMasterUsersRaw.getUserById(userId);

        if (!user || !user.display_picture) {
            return res.status(404).json({ success: false, message: "User or display picture not found" });
        }

        const imageUrl = user.display_picture;
        console.log("✅ Image URL from DB:", imageUrl);

        const HOME_DIR = os.homedir();
        const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
        const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";

        let configPath = process.env.NODE_ENV === "development" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;

        if (!fs.existsSync(configPath)) {
            throw new Error("AWS-S3 configuration file missing");
        }

        const s3config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        const urlParts = new URL(imageUrl);
        const bucketName = s3config.b;
        const objectKey = urlParts.pathname.substring(1);

        const s3 = new S3Client({
            region: s3config.region,
            credentials: {
                accessKeyId: s3config.a,
                secretAccessKey: s3config.s,
            },
        });

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });

        const s3Response = await s3.send(command);

        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Content-Type", s3Response.ContentType);
        s3Response.Body.pipe(res);
    } catch (error) {
        console.error("❌ Error fetching profile picture:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const searchUsers = async (req, res) => {
    try {
        if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }
        console.log(req.query, "query================================")
        const users = await req.models.basicMasterUsersRaw.search(req.query.query);
        res.json({ status: true, message: "Users found", data: users });
    } catch (err) {
        console.error("❌ Error in searchUsers:", err);
        res.status(500).json({ error: err.message });
    }
};



module.exports = {
    login,
    create,
    editUser,
    deleteUser,
    viewUsers,
    uploadProfilePicture,
    getProfilePicture,
    searchUsers
};