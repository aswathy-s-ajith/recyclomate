const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const Pickup = require("../models/pickupModel");
const User = require("../models/userModel");
const Driver = require("../models/driverModel");
const router = express.Router();

// Protected route: only admin can access
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome admin ${req.user.id}` });
});

// Protected route: both admin and driver can access
router.get("/driver", verifyToken, authorizeRoles("admin", "driver"), (req, res) => {
  res.json({ message: `Welcome driver/admin ${req.user.id}` });
});

// Protected route: everyone (admin, driver, user) can access
router.get("/user", verifyToken, authorizeRoles("admin", "driver", "user"), (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

// Get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    let account;

    if (req.user.role === "user") {
      account = await User.findById(req.user.id).select("-password");

      // Fetch all pickups for this user
      const pickups = await Pickup.find({ user: req.user.id }).sort({ date: 1 });

      return res.json({
        user: account,
        pickups,          // send the pickups array
        ecoPoints: account.ecoPoints || 0,
      });
    }

    // For driver/admin you can keep your existing logic
    if (req.user.role === "driver") {
      account = await Driver.findById(req.user.id).select("-password");
    } else if (req.user.role === "admin") {
      account = await User.findById(req.user.id).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.json({ user: account });
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
