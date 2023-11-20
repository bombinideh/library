import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";

export const logsGetMany = async (req: Request, res: Response) => {
  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "logs as l",
    });
    const logs = await query
      .leftJoin("users as u", "l.user_id", "u.user_id")
      .select("l.*", "u.name as user_name");

    res.send({ items: logs, total });
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
