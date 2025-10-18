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

router.get("/me", verifyToken, async (req, res) => {
  try {
    // Find user by the ID from the decoded token
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Dummy data for dashboard (can replace later)
    const nextPickup = {
      type: "Plastic Waste",
      address: user.address || "Not specified",
      date: "2025-10-20",
      time: "10:00 AM",
    };

    const ecoImpact = {
      plastic: 40,
      paper: 30,
      glass: 20,
    };

    res.json({
      user,
      nextPickup,
      ecoImpact,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

