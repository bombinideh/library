import { database } from "../knex";
import { IUser } from "../models/User";

export const existEmail = async (email: IUser["email"]) => {
  return await database("users").select("*").where({ email }).first();
};
