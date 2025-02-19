import nodemailer from 'nodemailer'
import crypto from 'crypto'
const OTP_STORE = new Map(); // Temporary in-memory store for OTPs


async function logic(req,res,next){

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
       
        auth:{
            user: "sender email",
            pass: "password"
        }
    })

    const generateOTP = () =>{
        return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
    }
    let {email} = req?.body;
    if(!email){
        throw 'Email is required'
    }
    const otp = generateOTP();
    OTP_STORE.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Valid for 5 minutes

    try {
        await transporter.sendMail({
            from:"senderEmail",
            to: "receivers email",
            subject: "Your OTP for Email Verification",
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        })

        return ({status: true, message: 'Otp send successfully'})

    } catch (error) {
        throw `Error occurred while sending otp via email ${error}`
    }

}

const verifyEmail = function Handler(req,res, next){
    logic(req,res, next)
    .then((data) => {
        res.status(201).send({status: true, body: {message:data}})
    })
    .catch((error) =>{
        res.status(401).send({status: false, body:{message: `${error}`}})
    })
}
export{
    verifyEmail
}
