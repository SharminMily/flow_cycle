import { catchAsynce } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BikeService } from "./bike.services";

const createBike = catchAsynce (async (req, res) => {
    //console.log(req.query)  
    const result = await BikeService.createbike (req.body);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike added successfully",
      //meta: result.meta,
      data: result
    })
  })

  //get all bike from database
const getAllBikeFromDB = catchAsynce (async (req, res) => {
    const result = await BikeService.getAllBikeFromDB();  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "bike fetched successfully", 
      data: result
    })
  })
  
  
  //single bike from database
  const getByIdFromDB = catchAsynce (async (req, res) => {
    const {id} = req.params 
    const result = await BikeService.getByIdFromDB(id);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike fetched successfully", 
      data: result
    })
  })

  
  ///update
const updateIdFromDB = catchAsynce (async (req, res) => {
    const {id} = req.params 
    const result = await BikeService.updateIntoDB(id, req.body);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike updated successfully", 
      data: result
    })
  })
  
  //Delete bike from database
  const deleteBikeFromDB = catchAsynce (async (req, res) => {
    const {id} = req.params 
    const result = await BikeService.deleteFromDB(id);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike deleted successfully", 
      data: result
    })
  })
  

  export const BikeController = {
  createBike,
  getAllBikeFromDB,
  getByIdFromDB,
  updateIdFromDB,
  deleteBikeFromDB
  } 