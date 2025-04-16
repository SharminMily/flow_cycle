import express, { Application, Request, Response } from 'express'

const app: Application = express();

//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/', (req: Request, res: Response) => {
    res.send({
        message: "Flow Cycle Server...!"
    })
})

export default app;