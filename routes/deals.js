const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');

// GET /api/deals - Get all deals, with optional country and category filters
router.get('/', async (req, res) => {
  try {
    const { country, category } = req.query;
    let filter = {};
    if (country) filter.country = country;
    if (category) filter.category = category;
    const deals = await Deal.find(filter).sort({ expiry_date: 1 });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/deals - Add a new deal
router.post('/', async (req, res) => {
  try {
    const { deal_title, description, category, country, deal_link, expiry_date } = req.body;
    if (!deal_title || !description || !category || !country || !deal_link) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    const newDeal = new Deal({ deal_title, description, category, country, deal_link, expiry_date });
    await newDeal.save();
    res.status(201).json(newDeal);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;  
