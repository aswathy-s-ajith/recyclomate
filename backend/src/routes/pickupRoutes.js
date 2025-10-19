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
router.patch('/:id/complete', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const pickup = await Pickup.findById(id).populate('user');
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });

    // Eco points logic for single type
    let ecoPoints = 0;
    switch (pickup.type) {
      case 'Plastic': ecoPoints = 10; break;
      case 'Paper': ecoPoints = 5; break;
      case 'Glass': ecoPoints = 8; break;
      case 'Metal': ecoPoints = 12; break;
      case 'E-Waste': ecoPoints = 15; break;
      default: ecoPoints = 0;
    }

    pickup.status = 'Completed';
    pickup.ecoPoints = ecoPoints;
    await pickup.save();

    // Add points to user’s total eco points
    const user = await User.findById(pickup.user._id);
    user.ecoPoints = (user.ecoPoints || 0) + ecoPoints;
    await user.save();

    res.json({
      message: 'Pickup marked as completed',
      ecoPoints,
      pickup
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating pickup', error: err.message });
  }
});

module.exports = router;
