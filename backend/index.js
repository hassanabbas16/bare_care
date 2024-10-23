const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Import product routes
const productRoutes = require('./routes/productRoutes');

// Initialize app and load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the product route
app.use('/api/products', productRoutes);

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
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
        req.userId = decoded.id;
        next();
    });
};

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Protected Route Example
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route!', userId: req.userId });
});

// Other routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});