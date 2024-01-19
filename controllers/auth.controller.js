const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const errorhandler = require("../utils/errorhandler");
dotenv.config();

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

module.exports = signin = async (req, res, next) => {
  try {
    const isUserExist = await usermodel.findOne({ email: req.body.email });
    if (isUserExist) {
      const compare = await bcrypt.compare(
        req.body.password,
        isUserExist.password
      );
      if (compare) {
        const userData = {
          _id: isUserExist._id,
          email: isUserExist.email,
        };
        const token = jwt.sign(userData, process.env.JWT_SCT, {
          expiresIn: "30d",
        });
        const { password, ...user } = isUserExist._doc;
        res.status(200).json({ ...user, token });
      } else {
        next(errorhandler(400, "Incorrect email/password"));
      }
    } else {
      next(errorhandler(400, "user not found"));
    }
  } catch (error) {
    next(error);
  }
};
