const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    deliveryAddress: {
        fullname: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        phonenumber: { type: String, required: true }
    },
    totalPrice: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ['COD', 'Online'], required: true, default: "COD" },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
