import express from "express";
import {
  edituser,
  deleteuser,
  getlistings,
} from "../controllers/user.controller.js";
const router = express.Router();
import { verifyUser } from "../utils/verifyuser.js";

router.put("/edituser/:id", verifyUser, edituser);
router.delete("/deleteuser/:id", verifyUser, deleteuser);
router.get("/getlistings/:id", verifyUser, getlistings);

export default router;
