import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  images: [String],
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model('Service', serviceSchema);