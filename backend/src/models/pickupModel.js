const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  type: [{ type: String, enum: ['Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste','Snitary Napkin'], required: true }],
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  ecoPoints: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
