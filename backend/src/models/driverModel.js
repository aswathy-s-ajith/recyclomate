const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
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
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    serviceArea: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "driver",
      immutable: true, // cannot be changed once set
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
