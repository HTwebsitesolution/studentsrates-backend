const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const Deal = require('../models/Deal');

// POST /api/chat - AI Chat Assistant
router.post('/', async (req, res) => {
  const { userId, userMessage } = req.body;

  if (!userId || !userMessage) {
    return res.status(400).json({ error: 'userId and userMessage are required' });
  }

  try {
    // Fetch user preferences
    const user = await User.findById(userId).populate('favourites');
    let country = 'your country';
    let categories = [];

    if (user && user.favourites.length) {
      country = user.favourites[0].country || country;
      categories = [...new Set(user.favourites.map(d => d.category))];
    }

    // Prepare prompt for OpenAI
    const systemPrompt = `You are a helpful assistant for StudentsRates, an app for student deals.
Reply in short, actionable, deal-focused answers.
Personalize suggestions for students in ${country} and interested in: ${categories.join(', ') || 'various categories'}.
If relevant, mention example deals or brands.`;

    const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 150,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const aiReply = openaiRes.data.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (err) {
    console.error('AI assistant error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'AI assistant error', details: err.response ? err.response.data : err.message });
  }
});

module.exports = router;
