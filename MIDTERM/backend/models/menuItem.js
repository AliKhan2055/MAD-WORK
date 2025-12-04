const mongoose = require('mongoose');

// This schema matches the requirements from Task 1
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true, // Default is true as required
  },
});

[
  {
    "name": "Espresso",
    "category": "Hot Drinks",
    "price": 800.50,
    "inStock": true
  },
  {
    "name": "Cappuccino",
    "category": "Hot Drinks",
    "price": 350.50,
    "inStock": true
  },
  {
    "name": "Iced Coffee",
    "category": "Cold Drinks",
    "price": 800.00,
    "inStock": true
  },
  {
    "name": "Latte",
    "category": "Hot Drinks",
    "price": 900.00,
    "inStock": true
  },
  {
    "name": "Croissant",
    "category": "Pastries",
    "price": 700.50,
    "inStock": true
  },
  {
    "name": "Muffin",
    "category": "Pastries",
    "price": 400.00,
    "inStock": false
  }
]

// The third argument 'menu_items' forces this exact collection name
module.exports = mongoose.model('MenuItem', menuItemSchema, 'menu_items');