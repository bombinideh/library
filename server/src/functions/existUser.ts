import { database } from "../knex";
import { IUser } from "../models/User";

export const existUser = async (param: IUser["email"] | IUser["user_id"]) => {
  const filter = typeof param === "string" ? { email: param } : { user_id: param };

  return database<IUser>("users").select("*").where(filter).first();
};
