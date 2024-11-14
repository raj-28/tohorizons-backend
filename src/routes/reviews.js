import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Create review
router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get service reviews
router.get('/service/:serviceId', async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId })
      .populate('customer', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;