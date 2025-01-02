import mongoose from "mongoose";
import { DB_NAME } from "../constance.js";
import dotEnt from "dotenv";
dotEnt.config();

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log(`\n MongoDB Connected !!! DB HOST ${connectInstance.connection.host}`);

  } catch (error) {
    console.log("MongoDb connection error", error);
    process.exit(1);
  }
};

export default connectDB;
