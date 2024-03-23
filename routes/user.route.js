const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const orderController = require("../controller/order.controller");

router.post("/add-user", userController.create);
router.get("/getalluser", userController.getAllUser);
router.get("/my-order", userController.MyOrders);
router.post("/place-order", orderController.createOrder);

module.exports = router;
