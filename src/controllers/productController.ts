import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";
import { Product } from "../entities/product";

class ProductController{
    async createProduct(req: Request, res:Response) {
        const {name, description, color, size, user_id} = req.body;

        try {  
            const user = await AppDataSource.getRepository(User).findOne({
                where:{id:user_id}
            })
            if(!user){
                return res.status(404).json({
                    ok: false,
                    mensagem: "Usuário que está cadastrando o produto não existe!",
                  });
            }
            
            await AppDataSource.getRepository(Product).save({
                name,
                description,
                color,
                size,                
                user: user_id
            });

            return res.status(201).json({
                ok:true,
                message: "Produto Cadastrado com Sucesso!",
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