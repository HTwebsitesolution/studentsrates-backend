const mongoose = require('mongoose');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // your schema fields
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
  
