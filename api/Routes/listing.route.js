import express, { Router } from "express";
import { createListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUserListing, getListing, updateUserListing,getListings } from "../controller/user.controller.js";

const route = express.Router() ;
 route.post('/create',verifyToken,createListing);
 route.delete('/delete/:id',verifyToken,deleteUserListing)
 route.post('/update/:id',verifyToken,updateUserListing)
 route.get('/get/:id',getListing)
 route.get('/get',getListings)

 export  default route;