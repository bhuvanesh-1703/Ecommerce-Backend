const express = require ('express')
const router = express.Router()
const AuthUserController = require('./auth.controller')


router.post("/register",AuthUserController.register)
router.post("/login",AuthUserController.login)

module.exports=router