import { Request, Response } from "express";
import { CustomerServices } from "./customer.services";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { catchAsynce } from "../../../shared/catchAsync";
const createCustomer = catchAsynce (async (req, res) => {
 // console.log(req.body)  
  const result = await CustomerServices.createCustomer(req.body);  
  sendResponse(res, {
    statusCode:  httpStatus.CREATED,
    success: true,
    message: "Customer created successfully",
    //meta: result.meta,
    data: result
  })
})

//get all customer from database
const getAllCustomerFromDB = catchAsynce (async (req, res) => {
  const result = await CustomerServices.getAllCustomerFromDB();  
  sendResponse(res, {
    statusCode:  httpStatus.OK,
    success: true,
    message: "Customer fetched successfully", 
    data: result
  })
})


//single customer from database
const getByIdFromDB = catchAsynce (async (req, res) => {
  const {customerId } = req.params 
  console.log(customerId)
  const result = await CustomerServices.getByIdFromDB(customerId );  
  sendResponse(res, {
    statusCode:  httpStatus.OK,
    success: true,
    message: "Customer fetched successfully", 
    data: result
  })
})

//update
const updateIdFromDB = catchAsynce (async (req, res) => {
  const {customerId } = req.params 
  const result = await CustomerServices.updateIntoDB(customerId , req.body);  
  sendResponse(res, {
    statusCode:  httpStatus.OK,
    success: true,
    message: "Customer updated successfully", 
    data: result
  })
})

//Delete customer from database
const deleteCustomerFromDB = catchAsynce (async (req, res) => {
  const {customerId } = req.params 
  const result = await CustomerServices.deleteFromDB(customerId );  
  sendResponse(res, {
    statusCode:  httpStatus.OK,
    success: true,
    message: "Customer deleted successfully", 
    data: [] 
  })
})


export const CustomerController = {
    createCustomer,
    getAllCustomerFromDB,
    getByIdFromDB,
    updateIdFromDB,
    deleteCustomerFromDB
}