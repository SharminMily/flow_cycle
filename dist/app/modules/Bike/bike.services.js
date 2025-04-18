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
exports.BikeService = void 0;
const prismaClient_1 = require("../../../shared/prismaClient");
//Create Bike
const createbike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeData = {
        brand: payload.brand,
        model: payload.model,
        year: payload.year,
        customerId: payload.customerId
    };
    const result = yield prismaClient_1.prisma.bike.create({
        data: bikeData,
    });
    return result;
    //   if (!payload.name || !payload.email || !payload.phone) {
    //     throw new Error("All fields are required.");
    //   }
});
//get all Bikes from database
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.findMany();
    return result;
});
//get single Bike from database
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.findUnique({
        where: { id }
    });
    if (!result) {
        throw new Error("Id not found");
    }
    return result;
});
//Update from Database
const updateIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.update({
        where: {
            id: id
        },
        data
    });
    return result;
});
//delete Bike from database
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.BikeService = {
    createbike,
    getAllBikeFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};
