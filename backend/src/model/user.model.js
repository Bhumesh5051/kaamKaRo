import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlength:3
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    }
})
const user = mongoose.model('user',userSchema)
export default user