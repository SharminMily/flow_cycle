import express from "express"
import { CustomerController } from "./customer.controller";

const router = express.Router();


router.get("/:id", CustomerController.getByIdFromDB) 
router.post("/", CustomerController.createCustomer) 
router.get("/", CustomerController.getAllCustomerFromDB) 
router.put("/:id", CustomerController.updateIdFromDB) 
router.delete("/:id", CustomerController.deleteCustomerFromDB) 

export const CustomerRouter = router;