import express from "express";
import { BikeController } from "./bike.controller";

const router = express.Router();

router.get("/:id", BikeController.getByIdFromDB) 
router.post("/", BikeController.createBike) 
router.get("/", BikeController.getAllBikeFromDB) 
router.put("/:id", BikeController.updateIdFromDB) 
router.delete("/:id", BikeController.deleteBikeFromDB) 


export const BikeRouter = router;