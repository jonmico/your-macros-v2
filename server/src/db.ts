import mongoose from 'mongoose';

export async function connectDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-macros-v2');
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
}
