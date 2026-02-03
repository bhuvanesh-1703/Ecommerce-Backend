const express = require('express')
const AllCart = require('./cart.controll')
const router = express.Router()

router.get('/:userId', AllCart.getCart)
router.post('/', AllCart.createCart)
router.put('/:id', AllCart.updateCart)
router.delete('/:id', AllCart.deleteCart)


module.exports = router
