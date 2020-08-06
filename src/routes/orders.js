const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.get("/total", ordersController.total);

module.exports = router;