const router = require("express").Router();
const course = require("./course");

router.use("/", course);

module.exports = router;
