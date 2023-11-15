import { Request, Response } from "express";
import { database } from "../knex";

export const shelfsGetMany = async (req: Request, res: Response) => {
  try {
    const shelfs = await database("shelfs").select("*");

    res.send(shelfs);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const shelfsPostOne = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const [insertedShelf] = await database("shelfs").insert(body).returning("*");

    res.send(insertedShelf);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const shelfsPatchOne = async (req: Request, res: Response) => {
  const { shelf_id } = req.params;
  const body = req.body;

  try {
    const existShelf = await database("shelfs").where({ shelf_id }).first();

    if (!existShelf) {
      res.status(404).send({ error: "Estante não encontrada" });
      return;
    }

    const [updatedShelf] = await database("shelfs")
      .where({ shelf_id })
      .update(body)
      .returning("*");

    res.send(updatedShelf);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};