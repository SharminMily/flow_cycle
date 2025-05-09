import AppError from "../../../shared/AppError";
import { prisma } from "../../../shared/prismaClient";
import { TBike } from "./bike.interface";
import httpStatus from "http-status"

//Create Bike
const createbike = async (payload: TBike): Promise<TBike> => {

  const customerExists = await prisma.customer.findUnique({
    where: { id: payload.customerId }
  });

  if (!customerExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

    const bikeData = {
        brand: payload.brand as string,
      model: payload.model as string,
      year: payload.year as number,
      customerId: payload.customerId as string
    };
  
    const result = await prisma.bike.create({
      data: bikeData,
    });
    return result;

}


//get all Bikes from database
const getAllBikeFromDB = async ()  => {  
    const result = await prisma.bike.findMany() 
    return result;
  };

  //get single Bike from database
const getByIdFromDB = async (id: string): Promise<TBike | null>  => {      
    const result = await prisma.bike.findUnique({
        where: { id }
      })
      if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "bike not found");
      }
    return result;
  };

  //Update from Database
  const updateIntoDB = async (id: string, data: Partial<TBike>): Promise<TBike> => {  
    const result = await prisma.bike.update({
        where: {
          id: id
        },
        data
      })
    return result;
  };


  //delete Bike from database
const deleteFromDB = async (id: string): Promise<TBike | null>  => {  
    const result = await prisma.bike.delete({
        where: {
          id: id
        }
      })
    return result;
  };


  export const BikeService = {
    createbike,
    getAllBikeFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
  }