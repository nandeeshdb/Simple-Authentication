
import Listing from "../models/listing.model.js"
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


  //geting userListing
  export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandling(401, 'You can only view your own listings!'));
    }
  };


  //delete user Listing

  export const deleteUserListing =async(req,res,next)=>{
    const listing  = await  Listing.findById(req.params.id);
    if(!listing){
      return next(errorHandling(404,'Listing not Found'))
    }

    if(req.user.id !== listing.userRef){
      return next(errorHandling(401,'You can only delet your listing'))
    }

    try {
      await Listing.findByIdAndDelete(req.params.id)
      res.status(200).json('listing as been deleted')
      
    } catch (error) {
      next(error)
      
    }
  }


  //updating user Listing
  export const updateUserListing = async(req,res,next)=>{

    const listing = await Listing.findById(req.params.id)
    if(!listing){
      return next(errorHandling(404,'Listing not found'))
    }
  
    if(req.user.id !== listing.userRef){
      return next(errorHandling(401,'You can only delet your listing'))
    }
  
    try {
      const updateListing  = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
      )
      res.status(200).json(updateListing)
      
    } catch (error) {
      next(error)
      
    }
   } 

   export const getListing =async(req,res,next)=>{
    try {
      const listing  = await Listing.findById(req.params.id);
      if(!listing){
        return next(errorHandling(404,"Listing not found"))
      }

      res.status(200).json(listing)
      
    } catch (error) {

      next(error)
      
    }

   }


   export const getUser=async(req,res,next)=>{
    try {
      const user = await User.findById(req.params.id)
      if(!user) return next(errorHandling(401,'USER NOT FOUND'))

      const {password:pass,...rest} = user._doc
      res.status(200).json(rest)
      
    } catch (error) {
      next(error)
      
    }

   }

   //search api
   export const getListings=async(req,res,next)=>{
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0
      let offer = req.query.offer;

      if(offer === undefined || offer==='false'){
        offer={$in:[false,true]};
      }

      let furnished = req.query.furnished;
      if(furnished === undefined || furnished === 'false'){
        furnished = {$in:[false,true]}
      }

      let parking = req.query.parking;
      if(parking===undefined || parking==='false'){
        parking={$in:[false,true]}
      }


      let type = req.query.type;
      if(type===undefined || type==='all'){
        type={$in:['sale','rent']}
      }

      const searchTerm = req.query.searchTerm || ''

      const sort = req.query.sort || 'createdAt'

      const order = req.query.oder || 'desc';

      const listings = await Listing.find({
        name:{$regex:searchTerm, $options:'i'},
        offer,
        furnished,
        parking,
        type,
      }).sort({
        [sort]:order
      }).limit(limit).skip(startIndex)


      return res.status(200).json(listings)

      
      
    } catch (error) {
      next(error)
      
    }
   }
  