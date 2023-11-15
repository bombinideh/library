import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";
import { Bookcase } from "../models/Bookcase";

export const bookcasesGetMany = async (req: Request, res: Response) => {
  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "bookcases",
    });
    const bookcases = await query;

    res.send({ items: bookcases, total });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const bookcasesPostOne = async (req: Request, res: Response) => {
  const bookcase = req.body;

  try {
    const [insertedBookcase] = await database("bookcases")
      .insert(bookcase)
      .returning("*");

    res.status(201).send(insertedBookcase);
  } catch (error) {
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};

export const bookcasesPatchOne = async (req: Request, res: Response) => {
  const { bookcase_id } = req.params;
  const body: Partial<Bookcase> = req.body;

  try {
    const existBookcase = await database("bookcases").where({ bookcase_id }).first();

    if (body.name) {
      const existName = await database("bookcases").where(body.name).first();

      if (existName) {
        res.status(409).send({ error: "Estante não encontrada" });
        return;
      }
    }

    if (!existBookcase) {
      res.status(404).send({ error: "Estante não encontrada" });
      return;
    }

    const [updatedBookcase] = await database("bookcases")
      .where({ bookcase_id })
      .update(body)
      .returning("*");

    res.send(updatedBookcase);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
