var express = require("express");
var router = express.Router();
var services = require('../controllers/services');

const validation = require('../middleware/validation');

router.get("/", services.getServices);
router.post("/", validation.adminAuth, services.createService);
router.put("/", validation.adminAuth, services.updateService);
router.delete("/", validation.adminAuth, services.deleteService);

module.exports = router;