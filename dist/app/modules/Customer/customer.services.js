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
exports.CustomerServices = void 0;
const prismaClient_1 = require("../../../shared/prismaClient");
//Create Customer
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.name || !payload.email || !payload.phone) {
        throw new Error("All fields are required.");
    }
    const customerData = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
    };
    const result = yield prismaClient_1.prisma.customer.create({
        data: customerData,
    });
    return result;
});
//get all customers from database
const getAllCustomerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.customer.findMany();
    return result;
});
//get single  customer from database
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.customer.findUnique({
        where: {
            id: id
        }
    });
    if (!result) {
        throw new Error("Id not found");
    }
    return result;
});
//Update from Database
const updateIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.customer.update({
        where: {
            id: id
        },
        data
    });
    return result;
});
//delete customer from database
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.customer.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.CustomerServices = {
    createCustomer,
    getAllCustomerFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};
