import { Status } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prismaClient";
import { TServiceRecord } from "./bikeServices.interface";

//Create Bike Record
const createServicesRecord = async (payload: TServiceRecord): Promise<TServiceRecord> => {
    const servicesRecordData = {
        bikeId: payload.bikeId as string,
        serviceDate: new Date(payload.serviceDate as string),
        description: payload.description as string,
        status: payload.status as Status,
    };
  
    const result = await prisma.serviceRecord.create({
      data: servicesRecordData,
    });
    return {
        serviceId: result.id,
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(), // ✅ convert to string
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
      };

//   if (!payload.name || !payload.email || !payload.phone) {
//     throw new Error("All fields are required.");
//   }
}


//get all Bikes Record from database
const getAllBikeServicesFromDB = async ()  => {  
    const result = await prisma.serviceRecord.findMany() 
    return result;
  };

  //get single Bike Record from database
const getByIdFromDB = async (id: string): Promise<TServiceRecord | null>  => {      
    const result = await prisma.serviceRecord.findUnique({
        where: { id }
      })
      if(!result){
        throw new Error("Id not found")
    }
    return {
        serviceId: result.id, // mapping 'id' to 'serviceId'
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
      };
  };

  //Update from Database
  const updateIntoDB = async (id: string, data: Partial<TServiceRecord>): Promise<TServiceRecord> => {  
    const result = await prisma.serviceRecord.update({
        where: {
          id: id
        },
        data
      })
      return {
        serviceId: result.id, // mapping 'id' to 'serviceId'
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
      };
  };


  //delete Bike from database
  const deleteFromDB = async (id: string): Promise<TServiceRecord | null> => {
    const result = await prisma.serviceRecord.delete({ where: { id } });
  
    return {
      serviceId: result.id,
      bikeId: result.bikeId,
      serviceDate: result.serviceDate.toISOString(),
      completionDate: result.completionDate ? result.completionDate.toISOString() : null,
      description: result.description,
      status: result.status
    };
  };


  export const BikeSRecordServices = {
    createServicesRecord,
    getAllBikeServicesFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
  }