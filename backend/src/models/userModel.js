const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
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
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "driver", "user"],
      default: "user",
    },

    // ✅ New fields for your app
    ecoPoints: {
      type: Number,
      default: 0, // Tracks total eco points earned by user
    },
    assignedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pickup", // Links to pickup tasks (for drivers)
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
