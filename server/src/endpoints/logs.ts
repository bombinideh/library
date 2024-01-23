import { Request, Response } from "express";
import { processQueryThatFindMany } from "../functions/processQueryThatFindMany";
import { database } from "../knex";

export const logsGetMany = async (req: Request, res: Response) => {
  try {
    const query = database("logs as l")
      .leftJoin("users as u", "l.user_id", "u.user_id")
      .select("u.name as user_name", "l.*");

    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query,
    });

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
