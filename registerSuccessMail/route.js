const express = require('express')
const router = express.Router()
const { registerSuccessMail } = require('./registermail')


router.post("/", registerSuccessMail)


module.exports = router
