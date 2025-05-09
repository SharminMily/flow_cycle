import express from "express"
import { CustomerController } from "./customer.controller";

const router = express.Router();


//router.get("/:customerId ", CustomerController.getByIdFromDB) 
router.get("/:customerId", CustomerController.getByIdFromDB)
router.post("/", CustomerController.createCustomer) 
router.get("/", CustomerController.getAllCustomerFromDB) 
router.put("/:customerId", CustomerController.updateIdFromDB) 
router.delete("/:customerId", CustomerController.deleteCustomerFromDB) 

export const CustomerRouter = router;