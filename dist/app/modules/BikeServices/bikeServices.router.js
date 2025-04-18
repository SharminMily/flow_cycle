"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeServicesRecordRouter = void 0;
const express_1 = __importDefault(require("express"));
const bikeServices_controller_1 = require("./bikeServices.controller");
const router = express_1.default.Router();
router.get("/:id", bikeServices_controller_1.BikeSRecordController.getByIdFromDB);
router.post("/", bikeServices_controller_1.BikeSRecordController.createBikeServicesRecord);
router.get("/", bikeServices_controller_1.BikeSRecordController.getAllBikeSRecordFromDB);
router.put("/:id", bikeServices_controller_1.BikeSRecordController.updateIdFromDB);
router.delete("/:id", bikeServices_controller_1.BikeSRecordController.deleteBikeSRecordFromDB);
router.get("/status", bikeServices_controller_1.BikeSRecordController.getServiceStatusHandler);
exports.BikeServicesRecordRouter = router;
