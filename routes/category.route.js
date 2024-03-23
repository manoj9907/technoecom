const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");

router.post("/add-category", categoryController.create);
router.get("/getall", categoryController.getCategory);

module.exports = router;
