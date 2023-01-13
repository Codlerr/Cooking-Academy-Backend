const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const classController = require("../../controllers/classDetails");

// POST : Create class
router.post("/", makeCallback(classController.addClass));

// GET  : Get all class
router.get("/", makeCallback(classController.viewClasss));

// GET  : Get all class
router.put("/lession", makeCallback(classController.deleteLesson));

// GET  : Get specified class by courseId
router.get("/:courseId/class", makeCallback(classController.viewClassByCourseId));

// GET  : Get specified class

router.get("/:id", makeCallback(classController.viewClass));

// PUT  : Edit the class
router.put("/:id", makeCallback(classController.editClass));

// POST : Delete class
router.delete("/:id", makeCallback(classController.deleteClass));

module.exports = router;
