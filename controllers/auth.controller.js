import usermodel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorhandler.js";
dotenv.config();

export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
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
        next(errorHandler(400, "Incorrect email/password"));
      }
    } else {
      next(errorHandler(400, "user not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const googleauth = async (req, res, next) => {
  try {
    const verifyuser = await usermodel.findOne({ email: req.body.email });
    if (verifyuser) {
      const userData = {
        _id: verifyuser._id,
        email: verifyuser.email,
      };
      const token = jwt.sign(userData, process.env.JWT_SCT, {
        expiresIn: "30d",
      });
      const { password, ...user } = verifyuser._doc;
      res.status(200).json({ ...user, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(generatedPassword, salt);

      const newData = new usermodel({
        username:
          req.body.username?.split(" ").join("").toLowerCase() + Math.random(),
        email: req.body.email,
        photo: req.body.photo,
        password: hash,
      });
      await newData.save();
      const userData = {
        _id: newData._id,
        email: newData.email,
      };
      const token = jwt.sign(userData, process.env.JWT_SCT, {
        expiresIn: "30d",
      });
      const { password, ...user } = newData._doc;
      res.status(200).json({ ...user, token });
    }
  } catch (error) {
    next(error);
  }
};
