const router = require("express").Router();
const account = require("./account");
const auth = require("./auth");
const { isUserAuthenticated } = require("../middlewares/authorizer");
const { ensureRequestSanity } = require("../middlewares/request");

// middleware
router.use(ensureRequestSanity());

router.use("/account", isUserAuthenticated, account);
router.use("/auth", auth);

module.exports = router;
