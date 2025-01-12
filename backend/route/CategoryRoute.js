const express = require("express");
const CategoryCtrl = require("../controller/Category");

const router = express.Router();

router.get("/get-all", CategoryCtrl.getAllCategory);

module.exports = router;
