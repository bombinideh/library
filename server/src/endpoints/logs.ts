import { Request, Response } from "express";
import { database } from "../knex";
import { queryFilter } from "../functions/queryFilter";

export const logsGetMany = async (req: Request, res: Response) => {
  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "logs",
    });

    res.send({ items: await query, total });
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
