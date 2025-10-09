import mongoose from "mongoose";
import asynchandler from "./asyncHandler.config.js";

const dbConnection = asynchandler(async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`);
})
export default dbConnection;