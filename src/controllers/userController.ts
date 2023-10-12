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
}

export default new UserController;