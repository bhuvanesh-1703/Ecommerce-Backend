const express = require('express')
const router = express.Router()
const { orderSuccessMail } = require('./mail-setup')



router.post("/", orderSuccessMail)


module.exports = router
