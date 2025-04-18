import express from "express";
import { CustomerRouter } from "../modules/Customer/customer.routes";
const router = express.Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: CustomerRouter
    },
    // {
    //     path: '/bikes',
    //     route: //
    // },
]
moduleRoutes.forEach(route => router.use(route.path, route.route)); 

export default router;