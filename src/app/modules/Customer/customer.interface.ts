export type TCustomer = {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
   }
export type TCustomerUpdate = {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
   }

export type TCustomerRest = {
    customerId : string;
    email: string | undefined;
    name: string | undefined;  
    phone: string | undefined;
    createdAt: Date;
    updateAt: Date;
   }

 