const mongoose = require('mongoose');
const env = require('./env');

/**
 * Establishes the MongoDB connection.
 * Exits the process on failure so orchestration tools (Render/PM2)
 * can restart the service rather than run in a broken state.
 */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv !== 'production',
    });

    // eslint-disable-next-line no-console
    console.log(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.warn('MongoDB disconnected');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
