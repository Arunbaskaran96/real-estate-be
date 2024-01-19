import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./errorhandler.js";

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const verify = jwt.verify(token, process.env.JWT_SCT, (err, user) => {
      if (err) next(errorHandler(400, "Auth verify failed"));
      req.user = user;
      next();
    });
  } else {
    next(errorHandler(400, "Auth required"));
  }
};
