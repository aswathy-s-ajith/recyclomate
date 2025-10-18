const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = {id:decoded.id,role: decoded.role}; // Adds user payload (id, role) to the request object
        next();
    });
};



module.exports = { verifyToken};