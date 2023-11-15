import { Request, Response } from "express";
import { IUser } from "../models/User";
import { database } from "../knex";
import bcrypt from "bcryptjs";
import { existUser } from "../functions/existUser";

export const usersGetMany = async (req: Request, res: Response) => {
  try {
    const users = await database("users").select("*");

    res.send(users);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const usersGetOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await database("users").whereRaw(`user_id = ${id}`).first();

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "Usuário não encontrado" });
    }
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const usersPostOne = async (req: Request, res: Response) => {
  const user: Pick<IUser, "email" | "name" | "password"> = req.body;

  try {
    if (await existUser(user.email)) {
      res.status(400).send({ error: "Email já existente" });
      return;
    }

    const passwordHash = await bcrypt.hash(user.password, 12);

    const [insertedUser] = await database("users")
      .insert({ ...user, password: passwordHash })
      .returning("*");

    await database("logs").insert({
      user_id: insertedUser.user_id,
      description: `Usuário ${user.name} criado com sucesso`,
      method: "POST",
    });

    res.status(201).send(insertedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};

export const usersPatchOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData: Pick<IUser, "email" | "name" | "password"> = req.body;

  try {
    const exist = await database("users").whereRaw(`user_id = ${id}`).first();

    if (!exist) {
      res.status(404).send({ error: "Usuário não encontrado" });
      return;
    }

    if (newData.email && (await existUser(newData.email))) {
      res.status(400).send({ error: "Email já existente" });
      return;
    }

    const [updatedUser] = await database("users")
      .whereRaw(`user_id = ${id}`)
      .update(newData)
      .returning("*");

    await database("logs").insert({
      user_id: id,
      description: `user_id ${updatedUser.user_id} atualizado com sucesso`,
      method: "PATCH",
    });

    res.send(updatedUser);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
