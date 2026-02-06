const express = require("express")
const router = express.Router()
const contactController=require('./contact.controller')

router.post("/", contactController.createContact);

router.get("/", contactController.getContact);

module.exports=router