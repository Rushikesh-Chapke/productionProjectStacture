import { query } from "../DB/index.js";
import jwt from 'jsonwebtoken'
import {app} from '../app.js'
import cookieParser from "cookie-parser";
async function getUsers(req){
    let {rows} = await query(`select * from student`);
    return rows
}

async function loginLogic(req,res){
    let userId = req.body.id
    
    let foundUser = await getUsers();

    let isValidUser = foundUser.find((user) => user?.id == userId)

    if(!isValidUser){
        throw (400, 'user not exist')
    }

    
    const token = jwt.sign({user: {id:isValidUser.id, user:isValidUser.name}}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "5m"} )
    if(token){
    return ({token, isValidUser})
    }else{
        throw 'Unable to generate jwt token try again'
    }
     
}

const login = function loginHandler(req,res){
    const options = {
        httpOnly: true,
        secure: true
    }
    loginLogic(req,res)
    .then((data) => {
        
        res.status(201).cookie("accessToken",data?.token, options)
        .send({status: true, body: {message:data}})
    })
    .catch((error) =>{
        res.status(401).send({status: false, body:{message: `${error}`}})
    })
    
} 

export {
    login
}