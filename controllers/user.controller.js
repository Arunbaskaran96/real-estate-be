import usermodel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorhandler.js";
import listing from "../models/listing.model.js";

export const edituser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id)
      next(errorHandler(400, "you can edit only your account"));
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }
    const user = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          photo: req.body.photo,
        },
      },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    res.status(200).json({ ...rest });
  } catch (error) {
    next(error);
  }
};

export const deleteuser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id)
      return next(errorHandler(400, "you can delete only your account"));
    const user = await usermodel.findOneAndDelete(req.user._id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getlistings = async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id)
      return next(errorHandler(400, "you cannot view others listing"));
    const data = await listing.find({ userRef: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
