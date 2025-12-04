const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Example: Get User Profile Data
router.get('/', protect, (req, res) => {
    // req.user contains the user data from the 'protect' middleware
    res.json({ 
        id: req.user._id, 
        name: req.user.name, 
        email: req.user.email,
        address: req.user.address,
        phone: req.user.phone
    });
});

// Example: Update User Profile Data
router.put('/', protect, (req, res) => {
    // Logic to update user fields (address, phone, name) in the database
    res.send('Update Profile route (Protected)');
});

module.exports = router;