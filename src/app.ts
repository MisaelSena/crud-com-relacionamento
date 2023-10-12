import "reflect-metadata";
import express, { Request, Response } from "express";


const app = express();

app.use(express.json());

app.get('/',(req: Request,res: Response)=>{
    res.send({
        ok: true,
        message: "Rota Funcionando"
    })
})


export default app;