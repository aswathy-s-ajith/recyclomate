const Pickup = require('../models/pickupModel');
const { createNotification } = require('./notificationController');

// Schedule a new pickup
const schedulePickup = async (req, res) => {
  try {
    const { type, date, time, address } = req.body;
    const userId = req.user.id;

    const pickup = new Pickup({
      user: userId,
      type,
      date,
      time,
      address,
      status: 'Pending'
    });

    await pickup.save();

    // Create notification for user
    await createNotification({
      recipient: userId,
      recipientModel: 'User',
      title: 'Pickup Scheduled',
      message: `Your pickup for ${type} has been scheduled for ${date} at ${time}.`,
      type: 'PICKUP_SCHEDULED',
      pickupId: pickup._id
    });

    res.status(201).json({
      message: 'Pickup scheduled successfully',
      pickup
    });
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    res.status(500).json({ message: 'Error scheduling pickup' });
  }
};

// Assign pickup to driver
const assignPickup = async (req, res) => {
  try {
    const { pickupId } = req.params;
    const { driverId } = req.body;

    const pickup = await Pickup.findByIdAndUpdate(
      pickupId,
      { driver: driverId, status: 'Assigned' },
      { new: true }
    );

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }

    // Create notification for driver
    await createNotification({
      recipient: driverId,
      recipientModel: 'Driver',
      title: 'New Pickup Assigned',
      message: `You have been assigned a new pickup for ${pickup.date} at ${pickup.time}.`,
      type: 'PICKUP_ASSIGNED',
      pickupId: pickup._id
    });

    // Create notification for user
    await createNotification({
      recipient: pickup.user,
      recipientModel: 'User',
      title: 'Driver Assigned',
      message: `A driver has been assigned to your pickup scheduled for ${pickup.date} at ${pickup.time}.`,
      type: 'PICKUP_ASSIGNED',
      pickupId: pickup._id
    });

    res.status(200).json({
      message: 'Pickup assigned successfully',
      pickup
    });
  } catch (error) {
    console.error('Error assigning pickup:', error);
    res.status(500).json({ message: 'Error assigning pickup' });
  }
};

// Complete pickup
const completePickup = async (req, res) => {
  try {
    const { pickupId } = req.params;
    const { ecoPoints } = req.body;

    const pickup = await Pickup.findByIdAndUpdate(
      pickupId,
      { status: 'Completed', ecoPoints },
      { new: true }
    ).populate('user');

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }

    // Create notification for user
    await createNotification({
      recipient: pickup.user._id,
      recipientModel: 'User',
      title: 'Pickup Completed',
      message: `Your pickup has been completed! You earned ${ecoPoints} eco points.`,
      type: 'PICKUP_COMPLETED',
      pickupId: pickup._id
    });

    res.status(200).json({
      message: 'Pickup completed successfully',
      pickup
    });
  } catch (error) {
    console.error('Error completing pickup:', error);
    res.status(500).json({ message: 'Error completing pickup' });
  }
};

module.exports = {
  schedulePickup,
  assignPickup,
  completePickup
};