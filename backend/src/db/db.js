import mongoose from 'mongoose'

const connectDb =async ()=>{
    try{await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected sucessfully");
        

}catch(err){
    console.log("error while connecting to db" , err);
    process.exit(1)
    
}} 
export default connectDb;