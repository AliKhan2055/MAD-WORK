const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    // price is typically fetched from Product model when calculating total
});

const CartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [CartItemSchema], // Array of CartItemSchema
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);