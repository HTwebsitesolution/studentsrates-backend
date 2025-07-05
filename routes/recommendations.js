const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Deal = require('../models/Deal');

// GET /api/recommendations/:userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favourites');
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.favourites.length) return res.json([]);

    // Count categories
    const categoryCount = {};
    user.favourites.forEach(deal => {
      categoryCount[deal.category] = (categoryCount[deal.category] || 0) + 1;
    });

    // Get most frequent categories
    const sortedCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat);

    const userCountry = user.favourites[0].country;

    // Find recommended deals
    const recommendedDeals = await Deal.find({
      category: { $in: sortedCategories },
      country: userCountry,
      _id: { $nin: user.favourites.map(d => d._id) }
    }).sort({ expiry_date: 1 });

    res.json(recommendedDeals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
