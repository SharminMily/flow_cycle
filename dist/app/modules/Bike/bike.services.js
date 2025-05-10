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
exports.BikeService = void 0;
const AppError_1 = __importDefault(require("../../../shared/AppError"));
const prismaClient_1 = require("../../../shared/prismaClient");
const http_status_1 = __importDefault(require("http-status"));
//Create Bike
const createbike = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customerExists = yield prismaClient_1.prisma.customer.findUnique({
        where: { customerId: payload.customerId }
    });
    if (!customerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
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
});
//get all Bikes from database
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.findMany();
    return result;
});
//get single Bike from database
const getByIdFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.findUnique({
        where: { bikeId }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "bike not found");
    }
    return result;
});
//Update from Database
const updateIntoDB = (bikeId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.update({
        where: {
            bikeId: bikeId
        },
        data
    });
    return result;
});
//delete Bike from database
const deleteFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.bike.delete({
        where: {
            bikeId: bikeId
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
