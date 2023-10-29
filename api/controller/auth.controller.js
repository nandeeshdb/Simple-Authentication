import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandling } from "../utils/error.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
export const signup = async(req,res,next)=>{
    dotenv.config();
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

export const signin = async(req,res,next)=>{

    const{email,password}= req.body;
    try {
        //checking whether email exsits or not
        const validUser = await User.findOne({email})

        //if email doesnot exist sending error message
        if(!validUser) return next(errorHandling(404,"User not found"))

        //if email exists the next step is to check password
        const vaildPassword = bcryptjs.compareSync(password,validUser.password)

        //if password is wrong sending error message
        if(!vaildPassword) return next(errorHandling(401,"Wrong Password"))

        //after both password and email both of them are correct we want to add token to the brower cookies
        //tokes are like hashed details of the user ...which can be used as verifying details of user
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)


        //removing password from the token because it is not a good practice to send password to the client
        const{password:hashPassword,...rest} = validUser._doc


        //SENDING COOKIES TO THE CLIENT SIDE AFTER TOKEN with expiery 
        const expieryDate = new Date(Date.now()+360000) ; // it is for one hour
        res.cookie('access_token',token,{
            httpOnly:true, 
            expires:expieryDate
        })
        .status(201).json(rest)

    } catch (error) {
        next(error)
        
    }


}