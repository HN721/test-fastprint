const express = require("express");
const statusCtrl = require("../controller/Status");

const router = express.Router();

router.get("/get-all", statusCtrl.getAllStatus);

module.exports = router;
