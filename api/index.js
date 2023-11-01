import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./Routes/user.route.js"
import authRoutes from './Routes/auth.route.js'
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to database')
})
.catch((error)=>{
    console.log(error);
})

const app = express();
app.use(express.json())
app.use(cookieParser())

app.listen(3000,()=>{
    console.log('server running in port 3000')
})

// app.get('/',(req,res)=>{
//     res.json({
//         message:"api is working"
//     })
// })

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)


//middleware

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
