import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";

export const boxesGetMany = async (req: Request, res: Response) => {
  const { shelf_id } = req.query;

  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "boxes as bx",
    });
    let boxes = query
      .leftJoin("shelfs as s", "s.shelf_id", "bx.shelf_id")
      .select("bx.*", "s.bookcase_id");

    if (shelf_id) boxes = boxes.where("bx.shelf_id", shelf_id);

    res.send({ items: await boxes, total });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const boxesPostOne = async (req: Request, res: Response) => {
  const body = req.body;
  const { user_id } = req;

  try {
    const [insertedBox] = await database("boxes").insert(body).returning("*");

    await database("logs").insert({
      user_id,
      description: `Caixa ${body.name} criada com sucesso`,
      method: "POST",
    });

    res.send(insertedBox);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const boxesPatchOne = async (req: Request, res: Response) => {
  const { box_id } = req.params;
  const body = req.body;
  const { user_id } = req;

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

    await database("logs").insert({
      user_id,
      description: `Caixa ${updatedBox.name} atualizada com sucesso`,
      method: "POST",
    });

    res.send(updatedBox);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
