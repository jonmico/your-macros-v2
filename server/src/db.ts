import mongoose from 'mongoose';
import 'dotenv/config';

const DB_STRING = process.env.DB_STRING as string;

export async function connectDb() {
  try {
    await mongoose.connect(DB_STRING);
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
}
