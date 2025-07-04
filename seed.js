require('dotenv').config();
const mongoose = require('mongoose');
const Deal = require('./models/Deal');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studentsrates';

const sampleDeals = [
  {
    deal_title: '50% off Student Spotify',
    description: 'Get Spotify Premium for half price with a valid student email.',
    category: 'Music',
    country: 'UK',
    deal_link: 'https://www.spotify.com/uk/student/',
    expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  },
  {
    deal_title: 'Apple Education Store',
    description: 'Discounts on Macs and iPads for students.',
    category: 'Tech',
    country: 'UK',
    deal_link: 'https://www.apple.com/uk-edu/store',
    expiry_date: null
  },
  {
    deal_title: 'Amazon Prime Student',
    description: '6 months free Prime, then 50% off.',
    category: 'Shopping',
    country: 'US',
    deal_link: 'https://www.amazon.com/amazonprime',
    expiry_date: null
  },
  {
    deal_title: 'UNiDAYS Discounts',
    description: 'Access thousands of student discounts globally.',
    category: 'General',
    country: 'UK',
    deal_link: 'https://www.myunidays.com/GB/en-GB',
    expiry_date: null
  },
  {
    deal_title: 'Student Universe Flights',
    description: 'Cheap flights for students worldwide.',
    category: 'Travel',
    country: 'US',
    deal_link: 'https://www.studentuniverse.com/',
    expiry_date: null
  }
];

const sampleUser = {
  username: 'teststudent',
  email: 'student@example.com',
  favourites: []
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Deal.deleteMany({});
    await User.deleteMany({});
    const deals = await Deal.insertMany(sampleDeals);
    sampleUser.favourites = [deals[0]._id, deals[1]._id];
    await User.create(sampleUser);
    console.log('Database seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();  
