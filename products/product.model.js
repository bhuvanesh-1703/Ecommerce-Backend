const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: { type: String, require: true },
    productname: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number },
    description: { type: String },
    productdetails:{type:String},
    stock: { type: Number },
    status: { type: String, default: "Active" }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
