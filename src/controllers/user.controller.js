import { json } from "express";
import { query }  from "../DB/index.js";


async function registerUser(userData){
    

    if(!userData?.id || !userData?.name || !userData?.fathername || !userData?.age) {return 'require four field (id,name,fathername,age)'}
    let {rows} = await query(`insert into student (id,name,fathername, age) values ($1,$2,$3,$4) returning * `,[userData?.id, userData?.name, userData?.fathername, userData?.age]);
    
    return rows
    
}
async function logic(req,res){
    let userData = req?.body;
  let newUser = await registerUser(userData);
    return newUser;
}

const register = function RegisterHandler(req,res){
    logic(req,res)
    .then((data) => {
        res.status(201).send({status: true, body: {message:data}})
    })
    .catch((error) =>{
        res.status(401).send({status: false, body:{message: `${error}`}})
    })
}

export  {
    register
}