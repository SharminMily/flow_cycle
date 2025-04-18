"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_routes_1 = require("../modules/Customer/customer.routes");
const bike_router_1 = require("../modules/Bike/bike.router");
const bikeServices_router_1 = require("../modules/BikeServices/bikeServices.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/customers',
        route: customer_routes_1.CustomerRouter
    },
    {
        path: '/bikes',
        route: bike_router_1.BikeRouter
    },
    {
        path: '/services',
        route: bikeServices_router_1.BikeServicesRecordRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
