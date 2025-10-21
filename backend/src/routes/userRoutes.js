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
      return res.json({ driver: account });
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

// Update current user profile
router.patch('/me', verifyToken, async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== 'user' && role !== 'admin') {
      return res.status(403).json({ message: 'Only users/admins can update profile via this endpoint' });
    }

    const updates = {};
    const allowed = ['username', 'email', 'phoneNumber', 'addresses', 'profilePic'];
    allowed.forEach(k => {
      if (typeof req.body[k] !== 'undefined') updates[k] = req.body[k];
    });

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
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
      // pickups list uses `assignedDriver` in the schema
      const countAssigned = pickups.filter(p => p.assignedDriver && p.assignedDriver.toString() === driver._id.toString()).length;
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
      .populate("assignedDriver", "username"); // populate assigned driver

    const formattedPickups = pickups.map(p => ({
      id: p._id,
      type: Array.isArray(p.type) ? p.type.join(', ') : p.type,
      user: p.user?.username || 'N/A',
      date: p.date,
      status: p.status,
      assignedDriver: p.assignedDriver?.username || null
    }));

    res.json({ pickups: formattedPickups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single driver details (Admin)
router.get('/admin/drivers/:driverId', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await Driver.findById(driverId).select('-password');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    const pickups = await Pickup.find();
    const countAssigned = pickups.filter(p => p.assignedDriver && p.assignedDriver.toString() === driver._id.toString()).length;

    const formatted = {
      id: driver._id,
      username: driver.username,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
      serviceArea: driver.serviceArea,
      vehicleNumber: driver.vehicleNumber,
      licenseNumber: driver.licenseNumber,
      vehicleType: driver.vehicleType,
      assignedPickups: countAssigned,
      available: countAssigned < 5,
    };

    res.json({ driver: formatted });
  } catch (err) {
    console.error('Get driver error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update driver details (Admin)
router.patch('/admin/drivers/:driverId', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { driverId } = req.params;
    const updates = req.body || {};

    const allowed = ['username', 'email', 'phoneNumber', 'serviceArea', 'vehicleNumber', 'licenseNumber', 'vehicleType'];
    const toSet = {};
    allowed.forEach(k => {
      if (typeof updates[k] !== 'undefined') toSet[k] = updates[k];
    });

    const driver = await Driver.findByIdAndUpdate(driverId, toSet, { new: true }).select('-password');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    const pickups = await Pickup.find();
    const countAssigned = pickups.filter(p => p.assignedDriver && p.assignedDriver.toString() === driver._id.toString()).length;

    const formatted = {
      id: driver._id,
      name: driver.username,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
      serviceArea: driver.serviceArea,
      vehicleNumber: driver.vehicleNumber,
      licenseNumber: driver.licenseNumber,
      vehicleType: driver.vehicleType,
      assignedPickups: countAssigned,
      available: countAssigned < 5,
    };

    res.json({ message: 'Driver updated', driver: formatted });
  } catch (err) {
    console.error('Update driver error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign driver to pickup
router.patch("/admin/:pickupId/assign", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { pickupId } = req.params;
    const { driverId } = req.body;

    if (!driverId) return res.status(400).json({ message: 'driverId is required in body' });

    const pickup = await Pickup.findById(pickupId);
    if (!pickup) return res.status(404).json({ message: "Pickup not found" });

    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    pickup.assignedDriver = driverId;
    await pickup.save();

    // populate and return formatted pickup
    const updated = await Pickup.findById(pickupId)
      .populate('user', 'username')
      .populate('assignedDriver', 'username');

    const formatted = {
      id: updated._id,
      type: Array.isArray(updated.type) ? updated.type.join(', ') : updated.type,
      user: updated.user?.username || 'N/A',
      date: updated.date,
      status: updated.status,
      assignedDriver: updated.assignedDriver?.username || null,
    };

    return res.json({ message: "Driver assigned successfully", pickup: formatted });
  } catch (err) {
    console.error('Assign driver error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete driver (Admin)
router.delete('/admin/drivers/:driverId', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    // Delete the driver document
    await Driver.findByIdAndDelete(driverId);

    // Unassign any pickups that referenced this driver
    await Pickup.updateMany(
      { assignedDriver: driverId },
      { $unset: { assignedDriver: "" } }
    );

    return res.json({ message: 'Driver deleted' });
  } catch (err) {
    console.error('Delete driver error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

// DRIVER SELF PROFILE ENDPOINTS
router.get("/drivers/me", verifyToken, authorizeRoles("driver"), async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id).select("-password");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({ driver });
  } catch (err) {
    console.error("GET /drivers/me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/drivers/me", verifyToken, authorizeRoles("driver"), async (req, res) => {
  try {
    const { id } = req.user;
    const updates = {};
    const allowed = [
      "username", "email", "phoneNumber", "serviceArea", "vehicleNumber", "licenseNumber", "vehicleType", "profilePic", "password"
    ];
    allowed.forEach(k => {
      if (typeof req.body[k] !== "undefined") updates[k] = req.body[k];
    });
    if (updates.password) {
      // hash password if present
      const bcrypt = require("bcryptjs");
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const driver = await Driver.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Profile updated", driver });
  } catch (err) {
    console.error("PATCH /drivers/me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
