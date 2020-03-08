var express = require("express");
var router = express.Router();
var services = require('../controllers/services');

router.get("/", services.getServices);
router.post("/", services.createService);
router.delete("/", services.deleteAllServices);

module.exports = router;