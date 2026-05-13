import app from "./src/app.js"
import dotenv from "dotenv"
import connectDb from "./src/db/db.js"
import express from 'express'


dotenv.config()
const PORT = process.env.PORT



app.listen(PORT,()=>{
     connectDb()
    console.log(`server is running on port ${PORT}`);
    
})