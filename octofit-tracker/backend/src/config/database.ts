import mongoose from 'mongoose';
import config from './app';

const connectionString = config.MONGODB_URI;
const db = mongoose.connection;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected to MongoDB at ${connectionString}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message || error);
  });

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default db;
