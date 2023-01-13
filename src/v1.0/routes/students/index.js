const router = require("express").Router();
const course = require("./course");
const cart = require("./cart");
const order = require("./order");
const payment = require("./payment");

router.use("/course", course);
router.use("/cart", cart);
router.use("/order", order);
router.use("/payment", payment);

module.exports = router;
