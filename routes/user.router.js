import express from "express";
import { edituser, getallusers } from "../controllers/user.controller.js";
const router = express.Router();
import { verifyUser } from "../utils/verifyuser.js";

router.put("/edituser/:id", verifyUser, edituser);
router.get("/allusers", verifyUser, getallusers);

export default router;
