import express from "express";
import { CustomerRouter } from "../modules/Customer/customer.routes";
import { BikeRouter } from "../modules/Bike/bike.router";
import { BikeServicesRecordRouter } from "../modules/BikeServices/bikeServices.router";
const router = express.Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: CustomerRouter
    },
    {
        path: '/bikes',
        route: BikeRouter
    },
    {
        path: '/services',
        route: BikeServicesRecordRouter
    },
]
moduleRoutes.forEach(route => router.use(route.path, route.route)); 

export default router;