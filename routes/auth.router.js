const { signup, signin } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
