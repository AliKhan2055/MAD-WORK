// backend/controllers/productController.js

const Product = require('../models/Product'); 

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        // Find all products without any filtering logic here (filtering is on the frontend)
        const products = await Product.find({}); 
        
        // Respond with the array of products
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error: Could not retrieve products' });
    }
};

module.exports = { getProducts };