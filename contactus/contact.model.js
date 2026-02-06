const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    phonenumber: { type: Number },
    
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
