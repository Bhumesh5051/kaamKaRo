import express from 'express'
import user from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import todo from '../model/todo.model'
 const route = express.Router()
 route.post("/register",async (req,res)=>{
    
    try {
        const {username , email ,password } = req.body
    const existuser = await user.findOne({email})
    if(existuser){
       return  res.status(400).json({
            message:"user already exist"
        })
    }
    const hashedpass = await bcrypt.hash(password,10)
    const newuser =  await user.create({
        username,email,
        password:hashedpass
    })
    res.status(201).json({
        message:"user created sucessfully",
        user:newuser
    })
    } catch (error) {
        console.log("error while creating user",error);
        res.status(500).json({
            message:'internal server error'
        })
    }
 })

 route.post('/login',async (req,res)=>{
    try{const { email , password } = req.body
    const existuser = await user.findOne({email})
    if(!existuser){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const correctpass = await bcrypt.compare(password,existuser.password)
    if(!correctpass){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({id:existuser._id},process.env.JWT_SECRET)
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,sameSite:'lax'
    })
    res.status(200).json({
        message:"logged in",
        user:existuser.username
    })}catch(error){
       console.log("error while finding user")
     res.status(400).json({
            message:"internal server error "
        })
    }
})

route.post('/logout',(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message :"logout sucessfully"})
})
 export default route