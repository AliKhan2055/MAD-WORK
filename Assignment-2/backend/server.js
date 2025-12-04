require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Will be similar to auth routes but for updates

// Use Routes
app.use('/api/auth', authRoutes); // Login, Signup
app.use('/api/products', productRoutes); // Home, Product Details, Category/Filter
// NOTE: You must implement the logic for cartRoutes, orderRoutes, and profileRoutes.
app.use('/api/cart', cartRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/profile', profileRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('E-Commerce Backend Server Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});