import { prisma } from "../../../shared/prismaClient";
import { TCustomer } from "./customer.interface";

//Create Customer
const createCustomer = async (payload: TCustomer): Promise<TCustomer> => {
  
  if (!payload.name || !payload.email || !payload.phone) {
    throw new Error("All fields are required.");
  }

  const customerData = {
    name: payload.name as string,
    email: payload.email as string,
    phone: payload.phone as string,
  };

  const result = await prisma.customer.create({
    data: customerData,
  });
  return result;
};

//get all customers from database
const getAllCustomerFromDB = async ()  => {  
    const result = await prisma.customer.findMany() 
    return result;
  };

  //get single  customer from database
const getByIdFromDB = async (id: string): Promise<TCustomer | null>  => {      
    const result = await prisma.customer.findUnique({
        where: {
          id: id
        }
      })
      if(!result){
        throw new Error("Customer not found")
    }
    return result;
  };

  //Update from Database
  const updateIntoDB = async (id: string, data: Partial<TCustomer>): Promise<TCustomer> => {  
    const result = await prisma.customer.update({
        where: {
          id: id
        },
        data
      })
    return result;
  };


  //delete customer from database
const deleteFromDB = async (id: string): Promise<TCustomer | null>  => {  
    const result = await prisma.customer.delete({
        where: {
          id: id
        }
      })
    return result;
  };

export const CustomerServices = {
  createCustomer,
  getAllCustomerFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB
};
