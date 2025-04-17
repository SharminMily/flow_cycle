import express from "express"
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.post("/", CustomerController.createCustomer) 

export const CustomerRouter = router;