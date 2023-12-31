import "reflect-metadata";
import express, { Request, Response } from "express";
import UserController from "./controllers/userController";
import ProductController from "./controllers/productController";


const app = express();

app.use(express.json());

//CRUD na entidade User
app.post('/users', UserController.createUser)
app.get('/users/:user_id?', UserController.listUsers)
app.patch('/users/:user_id', UserController.updateUser)
app.delete('/users/:user_id', UserController.softRemoveUser)

//CRUD na entidade Product
app.post('/products', ProductController.createProduct)
app.get('/products/:product_id?', ProductController.listProducts)
app.patch('/products/:product_id', ProductController.updateProduct)
app.delete('/products/:product_id', ProductController.softRemoveProduct)


export default app;