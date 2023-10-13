import "reflect-metadata";
import express, { Request, Response } from "express";
import UserController from "./controllers/userController";
import ProductController from "./controllers/productController";


const app = express();

app.use(express.json());

app.post('/user',UserController.createUser)
app.get('/users', UserController.listUsers)
app.get('/user/:id', UserController.listUsers)
app.post('/product',ProductController.createProduct)


export default app;