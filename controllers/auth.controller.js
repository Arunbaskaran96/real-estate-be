const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = signup = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new usermodel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ message: "new user added" });
  } catch (error) {
    next(error);
  }
};
