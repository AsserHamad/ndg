var express = require('express');
var router = express.Router();
var admin = require('../controllers/admin');

const { adminAuth } = require('../middleware/validation');

router.get("/verify", admin.verifyValidity);
router.post("/register", adminAuth, admin.adminRegister);
router.post("/login", admin.adminLogin);
router.put("/update", adminAuth, admin.adminUpdateEmail);
router.post("/upload", adminAuth, admin.adminUploadExcelFile);
router.get("/language", admin.getAllLanguage);
router.post("/language", admin.getLanguage);
router.put("/language", adminAuth, admin.adminUpdateLanguageText);

module.exports = router;