const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Other required imports

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Load routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
