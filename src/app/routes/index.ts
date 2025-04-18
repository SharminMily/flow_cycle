import express from "express";
import { CustomerRouter } from "../modules/Customer/customer.routes";
import { BikeRouter } from "../modules/Bike/bike.router";
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
]
moduleRoutes.forEach(route => router.use(route.path, route.route)); 

export default router;