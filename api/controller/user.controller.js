import User from "../models/user.model.js"
import { errorHandling } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req,res)=>{
    res.json({
        message:"Api is working"
    })
}


//updating userr

export const updateUser = async(req,res,next)=>{

    if(req.user.id !== req.params.id){
        return next(errorHandling(401,"you can  update only your account"))
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }


        const updatedUser = await User.findByIdAndUpdate(req.params.id,{

            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.password
            }
        },{new:true});

        const{password,...rest} = updatedUser._doc;

        res.status(200).json(rest);

        
    } catch (error) {
        next(error)
        
    }

}



//deleting user
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }

