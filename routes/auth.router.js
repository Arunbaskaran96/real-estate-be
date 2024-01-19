import { signin, signup, googleauth } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleauth", googleauth);

export default router;
