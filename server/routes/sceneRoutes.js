import { Router } from 'express';
import Scene from '../models/Scene.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    res.json(await Scene.find().sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    res.status(201).json(await Scene.create(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
