const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
      
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,          // Build indexes
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB is unreachable
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
