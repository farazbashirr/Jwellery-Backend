const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST /api/orders
router.post('/', async (req, res) => {
  const { items, fullName, email, phone, address, notes } = req.body;

  if (!items || !fullName || !email || !phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const order = new Order({ items, fullName, email, phone, address, notes });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

module.exports = router;
