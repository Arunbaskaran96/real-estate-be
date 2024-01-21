import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import authrouter from "./routes/auth.router.js";
import userrouter from "./routes/user.router.js";
import listingrouter from "./routes/listing.router.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyparser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", authrouter);
app.use("/api", userrouter);
app.use("/api", listingrouter);

app.use((error, req, res, next) => {
  const statuscode = error.statuscode || 500;
  const message = error.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(8000, () => {
  console.log("server connected");
});
