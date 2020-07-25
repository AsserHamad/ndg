var express = require("express");
var router = express.Router();
var contact = require('../controllers/contact');

const { adminAuth } = require('../middleware/validation');

router.post("/", contact.sendMessage);
router.get("/", adminAuth, contact.getContactMessages);
router.delete("/", adminAuth, contact.deleteMessage);
router.post("/email", adminAuth, contact.sendEmail);

module.exports = router;