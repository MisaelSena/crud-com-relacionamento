import "reflect-metadata";
import express, { Request, Response } from "express";
import UserController from "./controllers/userController";


const app = express();

app.use(express.json());

app.post('/user',UserController.createUser)


export default app;