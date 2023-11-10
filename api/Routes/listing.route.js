import express, { Router } from "express";
import { createListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { deleteUserListing, updateUserListing } from "../controller/user.controller.js";

const route = express.Router() ;
 route.post('/create',verifyToken,createListing);
 route.delete('/delete/:id',verifyToken,deleteUserListing)
 route.post('/update/:id',verifyToken,updateUserListing)

 export  default route;