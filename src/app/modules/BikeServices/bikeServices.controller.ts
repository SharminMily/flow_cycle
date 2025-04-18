import { catchAsynce } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BikeSRecordServices } from "./bikeServices.services";


const createBikeServicesRecord = catchAsynce (async (req, res) => {
    //console.log(req.query)  
    const result = await BikeSRecordServices.createServicesRecord (req.body);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike added successfully",
      //meta: result.meta,
      data: result
    })
  })

  //get all bike from database
const getAllBikeSRecordFromDB = catchAsynce (async (req, res) => {
    const result = await BikeSRecordServices.getAllBikeServicesFromDB();  
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
    const result = await BikeSRecordServices.getByIdFromDB(id);  
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
    const result = await BikeSRecordServices.updateIntoDB(id, req.body);  
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
    const result = await BikeSRecordServices.deleteFromDB(id);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Bike deleted successfully", 
      data: result
    })
  })
  

  export const BikeSRecordController = {
  createBikeServicesRecord,
  getAllBikeSRecordFromDB,
  getByIdFromDB,
  updateIdFromDB,
  deleteBikeFromDB
  } 