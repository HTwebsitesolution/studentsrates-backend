// Main entry point for StudentsRates backend API
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dealsRoutes = require('./routes/deals');
const usersRoutes = require('./routes/users');
const recommendationsRoutes = require('./routes/recommendations');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/deals', dealsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/chat', chatRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to StudentsRates API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  
