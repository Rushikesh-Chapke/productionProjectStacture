import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use(cors ({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '15kb'}))
app.use(express.urlencoded({extended:true, limit:'15kb'}))
app.use(express.static("public"))
app.use(cookieParser());

//import router
import userRouter from './routers/user.router.js';
import loginUser from './routers/user.login.router.js'
import sentOTP from './routers/verify.otp.router.js'

//routers declaration
app.use('/api/v1/users',userRouter)
app.use('/api/v1/users',loginUser)
app.use('/api/v1/sent',sentOTP)


export  {app}