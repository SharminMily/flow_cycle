import { Request, Response } from "express";
import { CustomerServices } from "./customer.services";

const createCustomer = async(req: Request, res:Response ) => {
       try {
        const result = await CustomerServices.createCustomer(req.body);
        res.status(200).json({
          success: true,
          message:  "admin created",
         data: result
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err?.message || "Something went wrong",
          error: err
        })
      }
    };


export const CustomerController = {
    createCustomer
}