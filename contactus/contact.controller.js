const Cantact = require('./contact.model')

const getContact = async (req, res) => {
    try {
        const contact = await Cantact.find()
        res.status(200).json({ success: true, message: "Contact  successfully", data: contact })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to view contact", error })
    }

}

const createContact = async (req, res) => {
    
    try {

        console.log(req.body);

        const contact = new Cantact(req.body)
       
        const response = await contact.save()

        console.log(response);
        
        res.status(201).json({ success: true, message: "Contact created successfully", data: response })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create contact", error })
    }
}

module.exports = { getContact, createContact }