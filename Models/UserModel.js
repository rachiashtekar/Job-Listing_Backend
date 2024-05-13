const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
    image: {
      type: String, // Assuming you're storing the image URL as a string
      default: "default.jpg", // Default image URL
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
