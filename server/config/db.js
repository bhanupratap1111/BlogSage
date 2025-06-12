import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => 
            console.log("MongoDB connected successfully")
        )  
        await mongoose.connect(`${process.env.MONGODB_URI}/blogSage`)
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
}

export default connectDB;