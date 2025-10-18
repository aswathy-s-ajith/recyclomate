const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const Pickup = require('../models/pickupModel');
const router = express.Router();

// Schedule a new pickup
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
    res.status(201).json({ message: 'Pickup scheduled successfully', pickup: newPickup });
  } catch (err) {
    res.status(500).json({ message: 'Error scheduling pickup', error: err.message });
  }
});

// Optional: get user's pickups
router.get('/my-pickups', verifyToken, async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user.id }).sort({ date: 1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pickups', error: err.message });
  }
});

module.exports = router;
