import mongoose from "mongoose";

let connectedToDB = false;

export const connectDB = async () => {
  try {
    if (connectedToDB) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI as string);
    connectedToDB = true;
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}