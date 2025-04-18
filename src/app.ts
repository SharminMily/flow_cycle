import express, { Application, Request, Response } from 'express'
import { CustomerRouter } from './app/modules/Customer/customer.routes';
import cors from 'cors'
import router from './app/routes';
const app: Application = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Flow Cycle Server...!"
    })
})

app.use("/api", router)

export default app;