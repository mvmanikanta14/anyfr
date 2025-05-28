const express = require('express');
const router = express.Router();
const { getSubdomain } = require('../../subdomainHelper'); // Ensure correct path
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const os = require("os");
const path = require("path");

const basicMasterUserController = require('../controllers/basicmasterusers.controller');

//const upload = require("../middlewares/upload");
const uploadMiddleware = require("../middlewares/upload");
const authenticateToken = require('../middlewares/authMiddleware');



const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const SECRET_KEY = process.env.JWT_SECRET || 'Anyfin@123';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'AnyfinRefresh@123';

// Function to Generate Tokens
const generateAccessToken = (user) => jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '6h' });
const generateRefreshToken = (user) => jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });


// ✅ User Login
router.post('/login', basicMasterUserController.login);

// ✅ Create new user
router.post('/create', authenticateToken, basicMasterUserController.create);

// ✅ Edit user
router.put('/edit/:id', authenticateToken, basicMasterUserController.editUser);

// ✅ Delete user
router.delete('/delete/:id', authenticateToken, basicMasterUserController.deleteUser);

// ✅ View all users (Paginated)
router.get('/view', authenticateToken, basicMasterUserController.viewUsers);

// ✅ Upload Profile Picture & Save URL in `display_picture`
router.post('/uploadimage', authenticateToken, basicMasterUserController.uploadProfilePicture);

// ✅ Get user Profile pic
router.get('/getProfilePic', authenticateToken, basicMasterUserController.getProfilePicture);

// ✅ Search users
router.get('/search', authenticateToken, basicMasterUserController.searchUsers);


module.exports = router;
