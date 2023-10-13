import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";

class UserController {
//Criando usuário
  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    try {
      const user = await AppDataSource.getRepository(User).save({
        name,
        email,
      });
      return res.status(201).json({
        ok: true,
        message: "Cadastrado com Sucesso!",
        userCadastrado: user,
      });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        mensagem: "Erro ao cadastar usuário!",
      });
    }
  }
//Listando um ou mais usuários
  async listUsers(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      if (user_id) {
        const user = await AppDataSource.getRepository(User).findOne({
          where: {
            id: +user_id,
          },
          relations: {
            products: true,
          },
        });
        if (!user) {
          return res.status(500).json({
            ok: false,
            mensagem: "Usuário não existe!",
          });
        }
        return res.status(200).json({
          ok: true,
          user: user,
        });
      } else {
        const users = await AppDataSource.getRepository(User).find({
          relations: {
            products: true,
          },
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
//Atualizando Usuário
  async  updateUser(req: Request, res: Response) {
    const {user_id} = req.params;
    const {name, email} = req.body;

    try {
        const user = await AppDataSource.getRepository(User).findOne({where:{id:+user_id}})
        if(!user) {
            return res.status(500).json({
            ok: false,
            mensagem: "Usuário não existe!",
          });
        }

        if(name) {user.name = name};
        if(email) {user.email = email};

        await AppDataSource.getRepository(User).save(user);

        return res.status(200).json({
            ok: true,
            mensagem: "Usuário Atualizado com Sucesso!",
          });

    } catch (error) {
        console.log(error, "Erro ao Atualizar Usuário!");
        return res.status(500).json({
        ok: false,
        mensagem: "Erro ao Atualizar usuário!",
        });
    }
  }
//Deletando Usuário no modo soft
}

export default new UserController();
