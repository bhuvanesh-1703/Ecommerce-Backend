const express = require("express");
const router = express.Router();
const orderController=require('./order.controll')

router.post("/", orderController.createOrder);

router.get("/", orderController.getOrder);

// router.get("/:userId", orderController.getOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
