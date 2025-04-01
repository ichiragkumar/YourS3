
import mongoose from "mongoose";
export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('Please set the MONGODB_URI environment variable');
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    return db;
}