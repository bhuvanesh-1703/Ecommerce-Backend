const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("./category.controller");


const upload = multer({ dest: 'uploads/' });



router.post("/", upload.single("image"), controller.createCategory);
router.get("/", controller.getCategory);
router.put("/:id", upload.single("image"), controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
