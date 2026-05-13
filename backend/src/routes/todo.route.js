import protectroute from "../middleware/auth.middleware.js";
import todo from "../model/todo.model.js";
import express from 'express'
// import user from "../model/user.model";
const todoroute = express.Router()

todoroute.post('/create-todo',protectroute,async (req,res)=>{
    try {
        const{title , description , priority , dueDate } = req.body
        
        const newtodo = await todo.create({
            title,description,user:req.user.id,priority,dueDate
        })
        res.status(201).json({message:"task added succesfully "})
    } catch (error) {
        res.status(500).json({message:"internal server error "})
        console.log(error);
        
    }
})

 todoroute.get("/",protectroute, async (req,res)=>{

try {
        const id = req.user.id
   const now = new Date()
   now.setHours(0,0,0,0)
await todo.updateMany(
  { user: id, dueDate: { $lt: now }, status: "pending" },
  { status: "overdue" }
)
const tasks = await todo.find({ user: id })
res.status(200).json({ message: "fetched successfully", tasks })
} catch (error) {
    res.status(500).json({
        message:"internal server error"
    })
    console.log(error);
    
}
 })
todoroute.put('/:id',protectroute,async (req,res)=>{
   
    try { const taskid = req.params.id
        const existtodo = await todo.findOne({_id:taskid})
    const task = await todo.findByIdAndUpdate(taskid,{status:existtodo.status === "pending"?"completed":"pending"},{new:true})
    res.status(200).json({
        message:"updated succesfully",
        task :task
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }
})
todoroute.delete('/:id',protectroute,async (req,res)=>{
try {
        const taskid = req.params.id
 await todo.findByIdAndDelete(taskid)
 res.status(200).json({message:"sucess"})

} catch (error) {
     console.log(error);
        res.status(500).json({message:"internal server error"})
}

})
export default todoroute