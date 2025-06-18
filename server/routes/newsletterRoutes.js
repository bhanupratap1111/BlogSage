import express from 'express';
import Newsletter from '../models/newsletter.model.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: 'Email is required' });
  try {
    await Newsletter.updateOne({ email }, { email }, { upsert: true });
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    res.json({ success: false, message: 'Subscription failed' });
  }
});

export default router; 