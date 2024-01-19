const { signup } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/signup", signup);

module.exports = router;
