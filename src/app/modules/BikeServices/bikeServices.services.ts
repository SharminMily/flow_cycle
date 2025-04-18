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
        throw new Error("Bike services Record not found")
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

  const getOverdueOrPendingServices = async (): Promise<TServiceRecord[]> => {
    const now = new Date();
    const sevenDaysAgoUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - 7
    ));
  
    const results = await prisma.serviceRecord.findMany({
      where: {
        status: {
          in: ['pending', 'in_progress'],
        },
        serviceDate: {
          lt: sevenDaysAgoUTC, 
        },
      },
    });  
  
    return results.map((record) => ({
      serviceId: record.id,
      bikeId: record.bikeId,
      serviceDate: record.serviceDate.toISOString(),
      completionDate: record.completionDate ? record.completionDate.toISOString() : null,
      description: record.description,
      status: record.status,
    }));
  };

  export const BikeSRecordServices = {
    createServicesRecord,
    getAllBikeServicesFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    getOverdueOrPendingServices
  }