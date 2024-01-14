import { Request, Response } from "express";
import { processQueryThatFindMany } from "../functions/processQueryThatFindMany";
import { database } from "../knex";

export const boxesGetMany = async (req: Request, res: Response) => {
  const { shelf_id } = req.query;

  try {
    let query = database("boxes as bx")
      .leftJoin("shelfs as s", "bx.shelf_id", "s.shelf_id")
      .leftJoin("bookcases as bc", "s.bookcase_id", "bc.bookcase_id")
      .select(
        "bc.name as bookcase_name",
        "s.name as shelf_name",
        "bc.bookcase_id",
        "bx.*",
      );

    if (shelf_id) query = query.where("bx.shelf_id", shelf_id);

    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query,
    });

    res.send(result);
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
      description: `Caixa "${body.name}" criada com sucesso`,
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
      description: `Caixa "${updatedBox.name}" atualizada com sucesso`,
      method: "POST",
    });

    res.send(updatedBox);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
