import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    engine: { type: String, enum: ['threejs', 'r3f', 'gsap', 'p5'], required: true },
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Scene', sceneSchema);
