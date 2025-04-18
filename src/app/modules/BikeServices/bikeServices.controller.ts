import { catchAsynce } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BikeSRecordServices } from "./bikeServices.services";


const createBikeServicesRecord = catchAsynce (async (req, res) => {   
    const result = await BikeSRecordServices.createServicesRecord (req.body);  
    sendResponse(res, {
      statusCode:  httpStatus.CREATED,
      success: true,
      message: "Service record created successfully",     
      data: result
    })
  })

  //get all bike from database
const getAllBikeSRecordFromDB = catchAsynce (async (req, res) => {
    const result = await BikeSRecordServices.getAllBikeServicesFromDB();  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Service record fetched successfully", 
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
      message: "Service record fetched successfully", 
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
      message: "Service record updated successfully", 
      data: result
    })
  })
  
  //Delete bike from database
  const deleteBikeSRecordFromDB = catchAsynce (async (req, res) => {
    const {id} = req.params 
    const result = await BikeSRecordServices.deleteFromDB(id);  
    sendResponse(res, {
      statusCode:  httpStatus.OK,
      success: true,
      message: "Service record deleted successfully", 
      data: result
    })
  })
  
  const getServiceStatusHandler = catchAsynce(async (req, res) => {
    const result = await BikeSRecordServices.getOverdueOrPendingServices();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Overdue or pending services fetched successfully",
      data: result,
    });
  });

  export const BikeSRecordController = {
  createBikeServicesRecord,
  getAllBikeSRecordFromDB,
  getByIdFromDB,
  updateIdFromDB,
  deleteBikeSRecordFromDB,
  getServiceStatusHandler
  } 