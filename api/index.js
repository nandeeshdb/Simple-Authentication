import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./Routes/user.route.js"
import authRoutes from './Routes/auth.route.js'
import listingRoutes from './Routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to database')
})
.catch((error)=>{
    console.log(error);
})

const __dirname = path.resolve()

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
app.use('/api/listing',listingRoutes)

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get(*,(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


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
