const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const studentController = require("../controllers/gust");

// GET  : Get all courses
router.get("/course", makeCallback(studentController.viewCourses));

//GET : view specified course
router.get("/course/:id", makeCallback(studentController.viewCourse));

module.exports = router;
