import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";
import { Product } from "../entities/product";

class ProductController{
//Criando Produto
    async createProduct(req: Request, res:Response) {
        const {name, description, color, size, product_id} = req.body;

        try {  
            const user = await AppDataSource.getRepository(User).findOne({
                where:{id:product_id}
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
                user: product_id
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
//Listando um ou mais produtos
async listProducts(req: Request, res: Response) {
    const { product_id } = req.params;
    try {
      if (product_id) {
        const product = await AppDataSource.getRepository(Product).findOne({
          where: {
            id: +product_id,
          },
          relations: {
            user: true,
          },
        });
        if (!product) {
          return res.status(404).json({
            ok: false,
            mensagem: "Produto não existe!",
          });
        }
        return res.status(200).json({
          ok: true,
          product: product,
        });
      } else {
        const products = await AppDataSource.getRepository(Product).find({
          relations: {
            user: true,
          },
        });
        return res.status(200).json({
          ok: true,
          products: products,
        });
      }
    } catch (error) {
      console.log(error, "Erro ao Listar os Produtos!");

      return res.status(500).json({
        ok: false,
        mensagem: "Erro ao Listar os Produtos!",
      });
    }
  }
//Atualizando Produto
  async  updateProduct(req: Request, res: Response) {
    const {product_id} = req.params;
    const {name, description, color, size} = req.body;

    try {
        const product = await AppDataSource.getRepository(Product).findOne({where:{id:+product_id}})
        if(!product) {
            return res.status(404).json({
            ok: false,
            mensagem: "Produto não existe!",
          });
        }

        if(name) {product.name = name};
        if(description) {product.description = description};
        if(size) {product.size = size};
        if(color) {product.color = color};

        await AppDataSource.getRepository(Product).save(product);

        return res.status(200).json({
            ok: true,
            mensagem: "Produto Atualizado com Sucesso!",
          });

    } catch (error) {
        console.log(error, "Erro ao Atualizar Produto!");
        return res.status(500).json({
        ok: false,
        mensagem: "Erro ao Atualizar Produto!",
        });
    }
  }
//Deletando produto no modo soft
async  softRemoveProduct(req: Request, res: Response) {
    const {product_id} = req.params;
    
    try {
        const product = await AppDataSource.getRepository(Product).findOne({where:{id:+product_id}})
        if(!product) {
            return res.status(404).json({
            ok: false,
            mensagem: "Produto não existe!",
          });
        }

        await AppDataSource.getRepository(Product).softRemove(product);

        return res.status(200).json({
            ok: true,
            mensagem: "Produto removido com Sucesso!",
          });

    } catch (error) {
        console.log(error, "Erro ao remover Produto!");
        return res.status(500).json({
        ok: false,
        mensagem: "Erro ao remover Produto!",
        });
    }
  }
}

export default new ProductController;