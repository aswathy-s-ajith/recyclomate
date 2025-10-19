const express=require("express");
const { verifyToken} = require("../middlewares/authMiddleware");
const authorizeRoles= require("../middlewares/roleMiddleware");

const User = require("../models/userModel");
const router=express.Router();

// Protected route: only admin can access
router.get("/admin", verifyToken,authorizeRoles("admin"), (req, res) => {
    res.json({ message: `Welcome admin ${req.user.id}` });
});

// Protected route: both admin and driver can access
router.get("/driver", verifyToken,authorizeRoles("admin","driver"), (req, res) => {
    res.json({ message: `Welcome driver/admin ${req.user.id}` });
});

// Protected route: everyone (admin, driver, user) can access
router.get("/user", verifyToken,authorizeRoles("admin","driver","user"), (req, res) => {
    res.json({ message: `Welcome user ${req.user.id}` });
});


const Driver = require("../models/driverModel");

router.get("/me", verifyToken, async (req, res) => {
  try {
    let account;

    if (req.user.role === "user") {
      account = await User.findById(req.user.id).select("-password");
    } else if (req.user.role === "driver") {
      account = await Driver.findById(req.user.id).select("-password");
    } else if (req.user.role === "admin") {
      account = await User.findById(req.user.id).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!account) {
      return res.status(404).json({ message: `${req.user.role} not found` });
    }

    // Default nextPickup for user role
    let nextPickup = null;
    if (req.user.role === "user") {
      const Pickup = require("../models/pickupModel"); // Make sure to require your pickup model
      nextPickup = await Pickup.findOne({ user: req.user.id, status: "Scheduled" }).sort({ date: 1 }) || null;
    }

    // Default ecoImpact
    const ecoImpact = {
      plastic: account.plasticPoints || 0,
      paper: account.paperPoints || 0,
      glass: account.glassPoints || 0,
    };

    res.json({ user: account, nextPickup, ecoImpact });
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

