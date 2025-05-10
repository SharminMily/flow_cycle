"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeSRecordServices = void 0;
const AppError_1 = __importDefault(require("../../../shared/AppError"));
const prismaClient_1 = require("../../../shared/prismaClient");
const http_status_1 = __importDefault(require("http-status"));
//Create Bike Record
const createServicesRecord = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesRecordData = {
        bikeId: payload.bikeId,
        serviceDate: new Date(payload.serviceDate),
        description: payload.description,
        status: payload.status,
    };
    const result = yield prismaClient_1.prisma.serviceRecord.create({
        data: servicesRecordData,
    });
    return {
        serviceId: result.serviceId,
        bikeId: result.bikeId,
        //  convert to string
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
//get all Bikes Record from database
const getAllBikeServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.findMany();
    return result;
});
//get single Bike Record from database
const getByIdFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.findUnique({
        where: { serviceId }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Bike services Record not found");
    }
    return {
        serviceId: result.serviceId,
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
//   const existingCustomer = await prisma.customer.findUnique({
//     where: { id }
//   });
//   if (!existingCustomer) {
//     throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
//   }
//   const result = await prisma.customer.update({
//       where: {
//         id: id
//       },
//       data: {
//         name: data.name,
//         phone: data.phone,
//         email: undefined,
//       }
//     })
//     const { email, ...rest } = result;
//     return rest as TCustomerRest;
// };
//Update from Database
const updateIntoDB = (serviceId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!serviceId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Service ID is required");
    }
    // Check if the service record exists
    const existingRecord = yield prismaClient_1.prisma.serviceRecord.findUnique({ where: { serviceId } });
    if (!existingRecord) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service record not found");
    }
    const result = yield prismaClient_1.prisma.serviceRecord.update({
        where: { serviceId },
        data,
    });
    return {
        serviceId: result.serviceId,
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status,
    };
});
//delete Bike from database
const deleteFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.delete({ where: { serviceId } });
    return {
        serviceId: result.serviceId,
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
const getOverdueOrPendingServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const sevenDaysAgoUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 7));
    const results = yield prismaClient_1.prisma.serviceRecord.findMany({
        where: {
            status: {
                in: ['pending', 'in_progress'],
            },
            serviceDate: {
                lt: sevenDaysAgoUTC,
            },
        },
    });
    const formatted = results.map((record) => ({
        serviceId: record.serviceId,
        bikeId: record.bikeId,
        serviceDate: record.serviceDate.toISOString(),
        completionDate: record.completionDate ? record.completionDate.toISOString() : null,
        description: record.description,
        status: record.status,
    }));
    if (formatted.length === 0) {
        return {
            data: [],
            message: "No overdue or pending services found.",
        };
    }
    return {
        data: formatted,
        message: "Success",
    };
});
exports.BikeSRecordServices = {
    createServicesRecord,
    getAllBikeServicesFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    getOverdueOrPendingServices
};
