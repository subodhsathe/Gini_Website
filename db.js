const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not set — skipping DB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.warn('Continuing without DB — API endpoints will fail until DB is available.');
  }
};

module.exports = connectDB;
