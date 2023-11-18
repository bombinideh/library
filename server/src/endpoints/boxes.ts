import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";

export const boxesGetMany = async (req: Request, res: Response) => {
  const { shelf_id } = req.query;

  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "boxes",
    });
    let boxes = query;

    if (shelf_id) boxes = query.where("shelf_id", shelf_id);

    res.send({ items: await boxes, total });
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const boxesPostOne = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const [insertedBox] = await database("boxes").insert(body).returning("*");

    res.send(insertedBox);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const boxesPatchOne = async (req: Request, res: Response) => {
  const { box_id } = req.params;
  const body = req.body;

  try {
    const existBox = await database("boxes").where({ box_id }).first();

    if (!existBox) {
      res.status(404).send({ error: "Caixa não encontrada" });
      return;
    }

    const [updatedBox] = await database("boxes")
      .where({ box_id })
      .update(body)
      .returning("*");

    res.send(updatedBox);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
