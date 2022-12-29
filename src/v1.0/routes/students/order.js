const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const orderController = require("../../controllers/order");

//POST : create orders & payment
router.post("/", makeCallback(orderController.addOrder));

//GET : view past orders & payment
router.get("/", makeCallback(orderController.viewOrders));

module.exports = router;
