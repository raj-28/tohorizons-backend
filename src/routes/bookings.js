import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.userId })
      .populate('service')
      .populate('provider', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;