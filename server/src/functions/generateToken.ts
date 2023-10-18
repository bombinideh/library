import { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const generateToken = (user_id: IUser["user_id"]) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
