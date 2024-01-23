import { Request, Response } from "express";
import { processQueryThatFindMany } from "../functions/processQueryThatFindMany";
import { database } from "../knex";
import { Bookcase } from "../models/Bookcase";

export const bookcasesGetMany = async (req: Request, res: Response) => {
  try {
    const query = database("bookcases as bc");
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query,
    });

    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const bookcasesPostOne = async (req: Request, res: Response) => {
  const body = req.body;
  const { user_id } = req;

  try {
    const bookcase = await database<Bookcase>("bookcases")
      .where("name", body.name)
      .first();

    if (bookcase)
      return res.status(400).json({ error: "Uma estante com esse nome já existe" });

    const [insertedBookcase] = await database("bookcases")
      .insert(body)
      .returning("*");

    await database("logs").insert({
      user_id,
      description: `Estante "${body.name}" criada com sucesso`,
      method: "POST",
    });

    res.status(201).send(insertedBookcase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};

export const bookcasesPatchOne = async (req: Request, res: Response) => {
  const { bookcase_id } = req.params;
  const body: Partial<Bookcase> = req.body;
  const { user_id } = req;

  try {
    const bookcase = await database<Bookcase>("bookcases")
      .where("bookcase_id", bookcase_id)
      .first();

    if (!bookcase) return res.status(404).send({ error: "Estante não encontrada" });

    const [updatedBookcase] = await database("bookcases")
      .where({ bookcase_id })
      .update(body)
      .returning("*");

    await database("logs").insert({
      user_id,
      description: `Estante "${bookcase.name}" atualizada com sucesso`,
      method: "PATCH",
    });

    res.send(updatedBookcase);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
