import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";
import { Product } from "../entities/product";

class ProductController{
    async createProduct(req: Request, res:Response) {
        const {name, description, color, size, user_id} = req.body;

        try {            
            const product = new Product();
            product.name = name;
            product.description = description;
            product.color = color;
            product.size = size;
            product.user = user_id;

            await AppDataSource.getRepository(Product).save(product);

            return res.status(201).json({
                ok:true,
                message: "Produto Cadastrado com Sucesso!",
                produtoCadastrado: product
            });
        } catch (error) {
            return res.status(500).json({
                ok: true,
                mensagem: "Erro ao cadastar produto!",
              });
        }
    }
}

export default new ProductController;