import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const createCustomer = async(data: any) => {
    console.log("create customer!!!", {data})
    console.log("incoming data shape:", JSON.stringify(data, null, 2));
    const customerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

const result = await prisma.customer.create({
    data: customerData
});
return result
}

export const CustomerServices = {
    createCustomer
}