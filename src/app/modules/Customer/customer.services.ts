import AppError from "../../../shared/AppError";
import { prisma } from "../../../shared/prismaClient";
import { TCustomer, TCustomerRest, TCustomerUpdate } from "./customer.interface";
import httpStatus from "http-status"

//Create Customer
const createCustomer = async (payload: TCustomer): Promise<TCustomer> => {
  
  if (!payload.name || !payload.email || !payload.phone) {   
   throw new AppError(httpStatus.NOT_FOUND, "All fields are required.");
  } 
  
  const existingCustomer = await prisma.customer.findUnique({
    where: { email: payload.email }
  });
 
  if (existingCustomer) {
    throw new AppError(httpStatus.CONFLICT, "Email already exists. Please use a different email.");
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
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
    }
    return result;
  };

  //Update from Database
  const updateIntoDB = async (id: string, data: TCustomerUpdate): Promise<TCustomerUpdate> => {  
    const existingCustomer = await prisma.customer.findUnique({
      where: { id }
    });
  
    if (!existingCustomer) {
      throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
    }
    const result = await prisma.customer.update({
        where: {
          id: id
        },
        data: {
          name: data.name,
          phone: data.phone,
          email: undefined,
        }
      })
     
      const { email, ...rest } = result;
      return rest as TCustomerRest;
  };


  //delete customer from database
const deleteFromDB = async (id: string): Promise<TCustomer | null>  => {  
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Customer ID is required");
  }
  
  const customerExists = await prisma.customer.findUnique({
    where: { id }
  });

  if (!customerExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
    const result = await prisma.customer.delete({
      where: { id }
      })

      if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
      }
      
    return result;
  };

export const CustomerServices = {
  createCustomer,
  getAllCustomerFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB
};
