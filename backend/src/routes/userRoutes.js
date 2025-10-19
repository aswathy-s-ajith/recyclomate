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

// Get all users (Admin only)
// Get all users (Admin only)
router.get("/admin/users", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
    const pickups = await Pickup.find(); // fetch all pickups

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Format users to include id and number of pickups
    const formattedUsers = users.map(user => {
      const userPickups = pickups.filter(p => p.user.toString() === user._id.toString());
      return {
        id: user._id,               // use _id as id
        username: user.username,
        email: user.email,
        ecoPoints: user.ecoPoints || 0,
        pickups: userPickups.length // number of pickups
      };
    });

    res.json({ users: formattedUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all drivers (Admin only)
// Get all drivers (Admin only)
router.get("/admin/drivers", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const drivers = await Driver.find().select("-password");
    const pickups = await Pickup.find(); // fetch all pickups

    const formattedDrivers = drivers.map(driver => {
      const countAssigned = pickups.filter(p => p.assignedDriverId?.toString() === driver._id.toString()).length;
      return {
        id: driver._id,
        name: driver.username,
        assignedPickups: countAssigned,
        available: countAssigned < 5 // example logic: available if assigned < 5 pickups
      };
    });

    res.json({ drivers: formattedDrivers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/pickups", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("user", "username") // get username from user
      .populate("assignedDriverId", "username"); // get assigned driver name

    const formattedPickups = pickups.map(p => ({
      id: p._id,
      type: p.type,
      user: p.user?.username || 'N/A',
      date: p.date,
      status: p.status,
      assignedDriver: p.assignedDriverId?.username || null
    }));

    res.json({ pickups: formattedPickups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
