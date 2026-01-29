const express = require("express");
const router = express.Router();
const adminUsersController = require("./user.controller");

router.get("/", adminUsersController.getUsers);
router.post("/", adminUsersController.createUser);
router.put("/:id", adminUsersController.updateUser);
router.delete("/:id", adminUsersController.deleteUser);

module.exports = router;
