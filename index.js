const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
// import express from 'express'
// const app=express()

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

const userrouter = require("./controllers/auth.controller");

app.use("/api", userrouter);

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
