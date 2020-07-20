var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');

const { adminAuth } = require('../middleware/validation');

router.get("/verify", admin.verifyValidity);
router.post("/register", adminAuth, admin.adminRegister);
router.post("/login", admin.adminLogin);
router.put("/update", adminAuth, admin.adminUpdateEmail);

module.exports = router;