import mongoose from "mongoose";

const usermodel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: "https://www.svgrepo.com/show/335455/profile-default.svg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usermodel);

export default User;
