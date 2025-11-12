const user =require("../models/userModel")
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')
const { findUser } = require("./userControl")

const login =async (req,res)=>{
    const {userName,password}=req.body
    if(!userName || !password){
        return res.status(400).json("all fields are requierd")
    }
    const foundUser= await user.findOne({userName}).lean()
    if(!foundUser){
        return res.status(401).json("unauthorized")
    }
    const match= await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res.status(401).json("unauthorized")
    }
    const userInfo={
        _id:foundUser._id,
        name:foundUser.name,
        role:foundUser.role,
        userName:foundUser.userName,
        email:foundUser.email
    }
    
    const token= jwt.sign(userInfo,process.env.ACCESS_TOKEN)
    res.json({token})
}


const register =async (req,res)=>{
    const {userName,name,phone,email,password}=req.body
        if(!userName|| !name|| !phone|| !email|| !password)
           return res.status(400).send("missing field")
        const duplicate = await user.findOne({userName}).lean()
        if(duplicate){
            return res.status(409).json("duplicate username")
        }
        const hashedPwd =await bcrypt.hash(password,10)
        const userObject= await user.create({userName,name,phone,email,password:hashedPwd})
        if(userObject){
            return res.status(201).json({message:`new user ${userObject.userName} created`})
        }
        else{
            return res.status(400).json("invalid user recived")
        }
   
}

module.exports= {login,register}