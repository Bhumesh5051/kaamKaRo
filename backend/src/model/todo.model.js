import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["completed","pending","overdue"],
        default:"pending"
    },
    priority:{
        type:String,
        enum:["high","medium","low"],
        default:"medium"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    }
},{timestamps:true})
const todo = mongoose.model("todo",todoSchema)

export default todo