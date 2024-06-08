import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

async function connectDb() {
    try {
        await mongoose.connect(mongoUrl);
        console.log('connection with database established...');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;