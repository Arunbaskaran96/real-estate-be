import express from "express";
import { edituser, deleteuser } from "../controllers/user.controller.js";
const router = express.Router();
import { verifyUser } from "../utils/verifyuser.js";

router.put("/edituser/:id", verifyUser, edituser);
router.delete("/deleteuser/:id", verifyUser, deleteuser);

export default router;
