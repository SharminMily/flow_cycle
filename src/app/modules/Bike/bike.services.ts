import { prisma } from "../../../shared/prismaClient";
import { TBike } from "./bike.interface";

//Create Bike
const createbike = async (payload: TBike): Promise<TBike> => {
    const customerData = {
        brand: payload.brand as string,
      model: payload.model as string,
      year: payload.year as number,
      customerId: payload.customerId as string
    };
  
    const result = await prisma.bike.create({
      data: customerData,
    });
    return result;

//   if (!payload.name || !payload.email || !payload.phone) {
//     throw new Error("All fields are required.");
//   }
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
      if(!result){
        throw new Error("Id not found")
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