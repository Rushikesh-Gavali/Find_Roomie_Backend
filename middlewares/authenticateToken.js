const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            response_code:401,
            response_message:'error',
            error: 'Unauthorized: user not logged in' 
        });
    }

    jwt.verify(token, secret_key, (error, decoded) => {
        if (error) {
            console.error(error);
            return res.status(403).json({ 
                response_code:403,
                response_message:error,
                error: 'Invalid Token' 
            });
        }

        if (!decoded.userId) {
            return res.status(404).json({
                response_code:200,
                response_message:'error', 
                error: 'UserId not found' });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = authenticateToken;
