var express = require("express");
var router = express.Router();
var projects = require('../controllers/projects');

const {adminAuth} = require('../middleware/validation');

router.get("/", projects.getProjects);
router.get("/:id", projects.getProject);
router.get("/explore", projects.getExampleProjects);
router.post("/", adminAuth, projects.createProject);
router.put("/", adminAuth, projects.updateProject);
router.delete("/", adminAuth, projects.deleteProject);

module.exports = router;