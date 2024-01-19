import usermodel from "../models/user.model.js";

import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorhandler.js";

export const edituser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id)
      next(errorHandler(400, "you can edit only your account"));
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username: req.body.username,
          password: hash,
          email: req.body.email,
          photo: req.body.photo,
        },
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getallusers = async (req, res, next) => {
  try {
    const user = await usermodel.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
