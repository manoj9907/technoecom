const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.post("/add-product", productController.create);
router.get("/getall", productController.getAllProduct);
router.get("/getproduct", productController.getProduct);

module.exports = router;
