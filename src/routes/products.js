const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.root);

router.get("/recents", productsController.recents);

router.get("/commodities/total", productsController.comTotal);

router.get("/:id", productsController.detail);

module.exports = router;