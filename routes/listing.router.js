import express from "express";
import {
  createListing,
  deletelisting,
  getlist,
  updatelisting,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyUser } from "../utils/verifyuser.js";
const router = express.Router();

router.post("/createlisting", createListing);
router.delete("/deletelisting/:id", verifyUser, deletelisting);
router.get("/getlist/:id", getlist);
router.put("/updatelist/:id", verifyUser, updatelisting);
router.get("/getlistings", verifyUser, getListings);

export default router;
