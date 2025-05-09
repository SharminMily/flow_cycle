import express from "express";
import { BikeController } from "./bike.controller";

const router = express.Router();

router.get("/:bikeId", BikeController.getByIdFromDB) 
router.post("/", BikeController.createBike) 
router.get("/", BikeController.getAllBikeFromDB) 
router.put("/:bikeId", BikeController.updateIdFromDB) 
router.delete("/:bikeId", BikeController.deleteBikeFromDB) 


export const BikeRouter = router;