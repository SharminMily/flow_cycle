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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const AppError_1 = __importDefault(require("../../../shared/AppError"));
const prismaClient_1 = require("../../../shared/prismaClient");
const http_status_1 = __importDefault(require("http-status"));
//Create Customer
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.name || !payload.email || !payload.phone) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "All fields are required.");
    }
    const existingCustomer = yield prismaClient_1.prisma.customer.findUnique({
        where: { email: payload.email },
    });
    if (existingCustomer) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Email already exists. Please use a different email.");
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
const getByIdFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.customer.findUnique({
        where: {
            customerId: customerId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
    return result;
});
//Update from Database
const updateIntoDB = (customerId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCustomer = yield prismaClient_1.prisma.customer.findUnique({
        where: { customerId },
    });
    if (!existingCustomer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
    const result = yield prismaClient_1.prisma.customer.update({
        where: {
            customerId: customerId,
        },
        data: {
            name: data.name,
            phone: data.phone,
            email: undefined,
        },
    });
    const { email } = result, rest = __rest(result, ["email"]);
    return rest;
});
//delete customer from database
const deleteFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!customerId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Customer ID is required");
    }
    const customerExists = yield prismaClient_1.prisma.customer.findUnique({
        where: { customerId },
    });
    if (!customerExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
    const result = yield prismaClient_1.prisma.customer.delete({
        where: { customerId },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
    return result;
});
exports.CustomerServices = {
    createCustomer,
    getAllCustomerFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
