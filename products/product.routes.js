const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminProductController = require('./products.controller');

const upload = multer({ dest: 'uploads/' });


router.get("/", adminProductController.getProduct);
router.get("/:id", adminProductController.getProductById);
router.post("/", upload.single("image"), adminProductController.createProduct);
router.put("/:id",upload.single("image"), adminProductController.updateProduct);
router.delete("/:id", adminProductController.deleteProduct);

module.exports = router;
