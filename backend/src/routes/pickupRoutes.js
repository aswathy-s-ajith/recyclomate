const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const Pickup = require('../models/pickupModel');
const User = require('../models/userModel'); // ✅ Added for eco points update
const router = express.Router();

// 📅 Schedule a new pickup
router.post('/schedule', verifyToken, async (req, res) => {
  const { date, time, type, address } = req.body;

  try {
    const newPickup = new Pickup({
      user: req.user.id,
      date,
      time,
      type,
      address
    });

    await newPickup.save();
    res.status(201).json({
      message: 'Pickup scheduled successfully',
      pickup: newPickup
    });
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling pickup', error: err.message });
  }
});

// 👤 Get all pickups by current user
router.get('/my-pickups', verifyToken, async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user.id }).sort({ date: 1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pickups', error: err.message });
  }
});

// 🚛 Get pickups assigned to a driver
router.get('/assigned', verifyToken, async (req, res) => {
  try {
    console.log("Driver ID from token:", req.user.id);
    const pickups = await Pickup.find({ assignedDriver: req.user.id });
    console.log(pickups);
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pickups', error: err.message });
  }
});

// ✅ Mark pickup as completed & assign eco points
// ✅ Mark pickup as completed & assign eco points manually
router.patch('/:id/complete', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { ecoPoints } = req.body; // driver can send ecoPoints manually

  try {
    const pickup = await Pickup.findById(id).populate('user');
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });

    pickup.status = 'Completed';
    pickup.ecoPoints = ecoPoints || pickup.ecoPoints || 0;
    await pickup.save();

    // Add points to user's total eco points
    const user = await User.findById(pickup.user._id);
    user.ecoPoints = (user.ecoPoints || 0) + pickup.ecoPoints;
    await user.save();

    res.json({
      message: 'Pickup marked as completed',
      ecoPoints: pickup.ecoPoints,
      pickup,
      userEcoPoints: user.ecoPoints,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating pickup', error: err.message });
  }
});

module.exports = router;
