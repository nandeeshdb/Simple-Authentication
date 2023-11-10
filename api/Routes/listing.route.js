import express, { Router } from "express";
import { createListing } from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const route = express.Router() ;
 route.post('/create',verifyToken,createListing);
 route.delete('/delete/:id',verifyToken,)

 export  default route;