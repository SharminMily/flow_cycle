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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeSRecordServices = void 0;
const prismaClient_1 = require("../../../shared/prismaClient");
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
});
//get all Bikes Record from database
const getAllBikeServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.findMany();
    return result;
});
//get single Bike Record from database
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.findUnique({
        where: { id }
    });
    if (!result) {
        throw new Error("Id not found");
    }
    return {
        serviceId: result.id, // mapping 'id' to 'serviceId'
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
//Update from Database
const updateIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.update({
        where: {
            id: id
        },
        data
    });
    return {
        serviceId: result.id, // mapping 'id' to 'serviceId'
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
//delete Bike from database
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.serviceRecord.delete({ where: { id } });
    return {
        serviceId: result.id,
        bikeId: result.bikeId,
        serviceDate: result.serviceDate.toISOString(),
        completionDate: result.completionDate ? result.completionDate.toISOString() : null,
        description: result.description,
        status: result.status
    };
});
const getOverdueOrPendingServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const results = yield prismaClient_1.prisma.serviceRecord.findMany({
        where: {
            status: {
                in: ['pending', 'in_progress'],
            },
            serviceDate: {
                lt: sevenDaysAgo,
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
});
exports.BikeSRecordServices = {
    createServicesRecord,
    getAllBikeServicesFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    getOverdueOrPendingServices
};
