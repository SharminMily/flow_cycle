import express from "express"
import { BikeSRecordController } from "./bikeServices.controller";

const router = express.Router();


router.get("/:id", BikeSRecordController.getByIdFromDB) 
router.post("/", BikeSRecordController.createBikeServicesRecord) 
router.get("/", BikeSRecordController.getAllBikeSRecordFromDB) 
router.put("/:id", BikeSRecordController.updateIdFromDB) 
router.delete("/:id", BikeSRecordController.deleteBikeSRecordFromDB) 

router.get("/status", BikeSRecordController.getServiceStatusHandler); 


export const BikeServicesRecordRouter = router;