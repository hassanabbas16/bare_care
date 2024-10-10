const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const verifyToken = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided.');
    }

    // Extract the actual token value from "Bearer <token>"
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token.');
        }

        return res.status(200).json({
            message: 'This is a protected route!',
            userId: decoded.id
        });
    });
};

module.exports = { verifyToken };
