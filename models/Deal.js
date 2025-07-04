const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  deal_title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  country: { type: String, required: true },
  deal_link: { type: String, required: true },
  expiry_date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Deal', DealSchema);  
