const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // define your fields here
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed
});

// Prevent OverwriteModelError:
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
