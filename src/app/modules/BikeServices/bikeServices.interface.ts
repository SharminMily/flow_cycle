import { Status } from "../../../../generated/prisma";

export type TServiceRecord = {
    serviceId: string | undefined;
    bikeId: string | undefined;
    serviceDate: string | undefined;
    completionDate: string | null | undefined;
    description: string | undefined;
    status: Status | undefined;
  };