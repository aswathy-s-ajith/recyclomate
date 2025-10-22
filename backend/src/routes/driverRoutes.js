// In your driverRoutes.js (create if not exists)
router.patch('/me', verifyToken, async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== 'driver') {
      return res.status(403).json({ message: 'Only drivers can update profile via this endpoint' });
    }
    const updates = {};
    const allowed = [
      'username', 'email', 'phoneNumber', 'profilePic',
      'vehicleType', 'vehicleNumber', 'licenseNumber', 'serviceArea', 'password'
    ];
    allowed.forEach(k => {
      if (typeof req.body[k] !== 'undefined') updates[k] = req.body[k];
    });
    // If password is present, hash it before saving!
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const driver = await Driver.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Profile updated', driver });
  } catch (err) {
    console.error('Update driver profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});