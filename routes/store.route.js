const express = require("express");
const router = express.Router();
const storeController = require("../controller/store.controller");

router.post("/add-store", storeController.create);
router.get("/getallstore", storeController.getStore);

module.exports = router;
