import express from "express"
import { BikeSRecordController } from "./bikeServices.controller";

const router = express.Router();


router.get("/status", BikeSRecordController.getServiceStatusHandler); 
router.get("/:serviceId", BikeSRecordController.getByIdFromDB) 
router.post("/", BikeSRecordController.createBikeServicesRecord) 
router.get("/", BikeSRecordController.getAllBikeSRecordFromDB) 
router.put("/:serviceId", BikeSRecordController.updateIdFromDB) 
router.delete("/:serviceId", BikeSRecordController.deleteBikeSRecordFromDB) 



export const BikeServicesRecordRouter = router;