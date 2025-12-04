// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ensure correct path to model

// @route GET /api/products
// @desc Get all products (supports filtering/search, but we rely on client-side for brand)
router.get('/', async (req, res) => {
    try {
        // Since the frontend is handling BRAND filtering, we simply fetch all products
        // for the home screen and let the frontend JS filter the results.
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error("Error in productRoutes GET /:", err.message);
        res.status(500).json({ message: err.message });
    }
});

// @route GET /api/products/:id
// @desc Get single product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Invalid Product ID format' });
        }
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;