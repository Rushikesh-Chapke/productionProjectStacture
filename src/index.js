import dotEvn from "dotenv"

import  {connectDB}  from "./DB/index.js";
dotEvn.config()
import {app} from './app.js'



connectDB()
.then(() =>{
app.listen(process.env.PORT, () =>{
  console.log(` Server is running on port no: ${process.env.PORT}`)
})
})
.catch((error) =>{
  console.log("Error occurred while connection to server")
})
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
