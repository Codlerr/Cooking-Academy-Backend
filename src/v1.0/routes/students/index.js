const router = require("express").Router();
const course = require("./course");
const cart = require("./cart");
const order = require("./order");

router.use("/course", course);
router.use("/cart", cart);
router.use("/order", order);

module.exports = router;
