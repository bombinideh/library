import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { existUser } from "../functions/existUser";
import { processQueryThatFindMany } from "../functions/processQueryThatFindMany";
import { database } from "../knex";
import { IUser, UserResponse } from "../models/User";

export const usersGetMany = async (req: Request, res: Response) => {
  try {
    const query = database("users as u");
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query,
    });

    result.items = result.items.map(user => {
      delete (user as UserResponse).password;
      return user;
    });

    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const usersGetOne = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const user = await database<IUser>("users")
      .whereRaw(`user_id = ${user_id}`)
      .first();

    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });

    delete (user as UserResponse).password;

    res.send(user);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const usersPostOne = async (req: Request, res: Response) => {
  const user: Pick<IUser, "email" | "name" | "password"> = req.body;

  try {
    if (await existUser(user.email))
      return res.status(400).send({ error: "Email já existente" });

    const passwordHash = await bcrypt.hash(user.password, 10);

    const [insertedUser] = await database<IUser>("users")
      .insert({ ...user, password: passwordHash })
      .returning("*");

    await database("logs").insert({
      user_id: insertedUser.user_id,
      description: `Usuário "${user.name}" criado com sucesso`,
      method: "POST",
    });

    delete (insertedUser as UserResponse).password;

    res.status(201).send(insertedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};

export const usersPatchOne = async (req: Request, res: Response) => {
  const { user_id } = req;
  const body: Pick<IUser, "email" | "name" | "password"> = req.body;

  try {
    const user = await database<IUser>("users").where("user_id", user_id).first();

    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });

    if (body.email && (await existUser(body.email)))
      return res.status(400).send({ error: "Email já existente" });

    const [updatedUser] = await database<IUser>("users")
      .whereRaw(`user_id = ${user_id}`)
      .update(body)
      .returning("*");

    delete (updatedUser as UserResponse).password;

    res.send(updatedUser);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const usersPatchPasswordOne = async (req: Request, res: Response) => {
  const {
    currentPassword,
    newPassword,
    newPasswordConfirm,
  }: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  } = req.body;
  const { user_id } = req;

  try {
    const user = await database<IUser>("users").where({ user_id }).first();

    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isCorrectPassword)
      return res.status(400).send({ error: "A senha atual está incorreta" });

    if (currentPassword === newPassword)
      return res.status(400).send({ error: "Digite uma senha diferente da atual" });

    if (newPassword !== newPasswordConfirm)
      return res
        .status(400)
        .send({ error: "A confirmação da nova senha é inválida" });

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const [updatedUser] = await database<IUser>("users")
      .where({ user_id })
      .update({ password: passwordHash })
      .returning("*");

    delete (updatedUser as UserResponse).password;

    res.send(updatedUser);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
