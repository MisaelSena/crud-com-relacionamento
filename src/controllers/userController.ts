import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";

class UserController{
    async createUser(req: Request, res: Response) {
        const {name, email} = req.body;
        try {           
            const user = await AppDataSource.getRepository(User).save({
                name,
                email
            })
            return res.status(201).json({
                ok:true,
                message: "Cadastrado com Sucesso!",
                userCadastrado: user
            });
        } catch (error) {
            return res.status(500).json({
                ok: true,
                mensagem: "Erro ao cadastar usuário!",
              });
        }
    }

    async listUsers(req: Request, res: Response) {
        const {id} = req.params;
        try {
            if(id) {
                const user = await AppDataSource.getRepository(User).findOne({
                    where:{
                        id: +id,
                    },
                    relations:{
                        products: true,
                    }
                });
                return res.status(200).json({
                    ok: true,
                    user: user,
                  }); 
            }else{
                const users = await AppDataSource.getRepository(User).find({
                    relations:{
                        products: true,
                    }
                });
                return res.status(200).json({
                    ok: true,
                    users: users,
                  });
            }

            
        } catch (error) {
            console.log(error, "Erro ao Listar os Usuários!");

            return res.status(500).json({
            ok: false,
            mensagem: "Erro ao Listar os Usuários!",
            });
        }
    }
}

export default new UserController;