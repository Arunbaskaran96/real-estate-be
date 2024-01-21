import express from "express";
import {
  createListing,
  deletelisting,
  getlist,
  updatelisting,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyuser.js";
const router = express.Router();

router.post("/createlisting", createListing);
router.delete("/deletelisting/:id", verifyUser, deletelisting);
router.get("/getlist/:id", verifyUser, getlist);
router.put("/updatelist/:id", verifyUser, updatelisting);

export default router;
