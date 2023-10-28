import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandling } from "../utils/error.js";



export const signup = async(req,res,next)=>{
    //next is the middle ware from index.js
    const {username,email,password} = req.body;

    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashPassword});


    try {
        await newUser.save();
        res.status(201).json({message:"User created successfully"});
    
        
    } catch (error) {
        next(error);
        
    }
   
}