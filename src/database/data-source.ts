import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Product } from "../entities/product";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "crud-com-relacionamentos",
    synchronize: true,
    logging: true,
    entities: [User, Product],   
})