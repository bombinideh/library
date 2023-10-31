import { Request, Response } from "express";
import { IUser } from "../models/User";
import { database } from "../knex";
import { existUser } from "../functions/existUser";
import bcrypt from "bcryptjs";
import { generateToken } from "../functions/generateToken";
import crypto from "crypto";
import nodemailer from "nodemailer";

type SignInBody = Pick<IUser, "email" | "password">;

export const signIn = async (req: Request, res: Response) => {
  const { email, password }: SignInBody = req.body;

  try {
    const user = await existUser(email);
    if (!user.active) {
      res.status(400).send({ error: "User not active" });
      return;
    }

    if (!user) {
      res.status(400).send({ error: "User not found" });
      return;
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(400).send({ error: "Incorrect password" });
      return;
    }

    delete user.password;

    res.send({ user, token: generateToken(user.id) });
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email, url } = req.body;

  try {
    const user = await existUser(email);

    if (!user) {
      res.status(400).send({ error: "User not found" });
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

    transporter.sendMail(message, (err) => {
      if (err) {
        res.status(500).send({ error: "Error to send the email" });
        return;
      }

      res.send({ message: "Email sent" });
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { user_id, token, password } = req.body;

  try {
    const user = await existUser(user_id);

    if (!user) {
      res.status(400).send({ error: "User not found" });
      return;
    }

    const passwordChangeRequest = await database("password_resets")
      .select("*")
      .where({ token })
      .first();

    if (!passwordChangeRequest || passwordChangeRequest.token !== token) {
      res.status(401).send({ error: "Invalid token" });
      return;
    }

    if (passwordChangeRequest.token_expires < new Date()) {
      res.status(401).send({ error: "token expired" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await database.transaction(async (db) => {
      await db("users").where({ user_id }).update({ password: passwordHash });
      await db("password_resets").where({ token }).del();
    });

    delete user.password;

    res.send({ user, token: generateToken(user.user_id) });
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
};
