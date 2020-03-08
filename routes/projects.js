var express = require("express");
var router = express.Router();
var projects = require('../controllers/projects');

router.get("/", projects.getProjects);
router.post("/", projects.createProject);
router.delete("/", projects.deleteAllProjects);

module.exports = router;