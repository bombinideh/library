import { Request, Response } from "express";
import { IUser } from "../models/User";
import { database } from "../knex";
import { existEmail } from "../functions/existEmail";
import bcrypt from "bcryptjs";
import { generateToken } from "../functions/generateToken";

type SignInBody = Pick<IUser, "email" | "password">;

export const signIn = async (req: Request, res: Response) => {
  const { email, password }: SignInBody = req.body;

  try {
    const user = await existEmail(email);
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
