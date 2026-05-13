import express from 'express'
import authroute from "./routes/auth.route.js"
import cookieparser from 'cookie-parser'
import todoroute from './routes/todo.route.js'
import cors from 'cors'
const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieparser())
app.use('/api/auth', authroute)
app.use('/api/todo',todoroute)


export default app;