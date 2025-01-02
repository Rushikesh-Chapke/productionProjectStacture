// require('dotenv').config()
// import dotEvn from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constance";
import  connectDB  from "./DB/index.js";
// dotEvn.config({ path: "./env" });



connectDB();;;

/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });
    app.listen(`${process.env.PORT}`, () => {
      console.log(`app is listing on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log('"error', error);
    throw error;
  }
})(); */
