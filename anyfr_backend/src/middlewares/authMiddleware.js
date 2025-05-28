const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'Anyfin@123';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // Decode the token to get its contents without verification
    const decodedToken = jwt.decode(token);
    console.log(decodedToken.organisation_id)
    console.log(decodedToken.user_id)
    req.organisation_id = decodedToken.organisation_id;
    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
