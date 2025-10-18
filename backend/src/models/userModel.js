const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,   // ✅ fixed
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "driver", "user"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
