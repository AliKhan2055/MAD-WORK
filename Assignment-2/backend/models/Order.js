const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Price at time of order
});

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    total_amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' }, // e.g., Pending, Processing, Shipped, Delivered
    order_date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);