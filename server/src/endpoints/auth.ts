import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { existUser } from "../functions/existUser";
import { generateToken } from "../functions/generateToken";
import { database } from "../knex";
import { IUser, UserResponse } from "../models/User";

type SignInBody = Pick<IUser, "email" | "password">;

export const signIn = async (req: Request, res: Response) => {
  const { email, password }: SignInBody = req.body;

  try {
    const user = await existUser(email);

    if (!user) {
      res.status(400).send({ error: "Usuário não encontrado" });
      return;
    }

    if (!user.active) {
      res.status(400).send({ error: "Usuário desativado" });
      return;
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(400).send({ error: "Senha incorreta" });
      return;
    }

    delete (user as UserResponse).password;

    res.send({ user, token: generateToken(user.user_id) });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, url } = req.body;

  try {
    const user = await existUser(email);

    if (!user) {
      res.status(400).send({ error: "Usuário não encontrado" });
      return;
    }

    const token = crypto.randomBytes(20).toString("hex");

    const tokenExpires = Date.now() + 1000 * 60 * 30;

    const message = {
      from: {
        name: "CEAC",
        address: process.env.MAIL_FROM,
      },
      to: user.email,
      subject: "Recuperação de senha",
      html: `
        <h1>Recuperação de senha</h1>
        <p>Clique no link abaixo para recuperar sua senha</p>
        <a href="${url}?token=${token}&user_id=${user.user_id}">Recuperar senha</a>
      `,
    };

    await database("password_resets").insert({
      user_id: user.user_id,
      token,
      token_expires: new Date(tokenExpires),
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    transporter.sendMail(message, err => {
      if (err) {
        res.status(500).send({ error: "Erro ao enviar email" });
        return;
      }

      res.send({ message: "Email enviado" });
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { user_id, token, password } = req.body;

  try {
    const user = await existUser(user_id);

    if (!user) {
      res.status(400).send({ error: "Usuário não encontrado" });
      return;
    }

    const passwordChangeRequest = await database("password_resets")
      .select("*")
      .where({ token })
      .first();

    if (!passwordChangeRequest || passwordChangeRequest.token !== token) {
      res.status(401).send({ error: "Token Inválido" });
      return;
    }

    if (passwordChangeRequest.token_expires < new Date()) {
      res.status(401).send({ error: "Token expirado" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await database.transaction(async db => {
      await db("users").where({ user_id }).update({ password: passwordHash });
      await db("password_resets").where({ token }).del();
    });

    delete (user as UserResponse).password;

    res.send({ user, token: generateToken(user.user_id) });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const user = await database<IUser>("users")
      .where("user_id", req.user_id)
      .first();

    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });

    delete (user as UserResponse).password;

    res.send(user);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
