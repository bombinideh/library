import { Request, Response } from "express";
import { queryFilter } from "../functions/queryFilter";
import { database } from "../knex";

export const shelfsGetMany = async (req: Request, res: Response) => {
  const { bookcase_id } = req.query;

  try {
    const { query, total } = await queryFilter({
      queryParams: req.query,
      table: "shelfs",
    });
    let shelfs = query;

    if (bookcase_id) shelfs = query.where("bookcase_id", bookcase_id);

    res.send({ items: await shelfs, total });
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const shelfsPostOne = async (req: Request, res: Response) => {
  const body = req.body;
  const { user_id } = req;

  try {
    const [insertedShelf] = await database("shelfs").insert(body).returning("*");

    await database("logs").insert({
      user_id,
      description: `Prateleira "${body.name}" criado com sucesso`,
      method: "POST",
    });

    res.send(insertedShelf);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

export const shelfsPatchOne = async (req: Request, res: Response) => {
  const { shelf_id } = req.params;
  const body = req.body;
  const { user_id } = req;

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

    await database("logs").insert({
      user_id,
      description: `Prateleira "${updatedShelf.name}" atualizada com sucesso`,
      method: "PATCH",
    });

    res.send(updatedShelf);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
