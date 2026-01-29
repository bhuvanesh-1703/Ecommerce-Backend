const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryname: { type: String },
    subcategory: { type: String, },
    description: { type: String, default: '' },
    image: { type: String }

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

