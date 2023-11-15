import { Request, Response } from "express";
import { database } from "../knex";

export const boxesGetMany = async (req: Request, res: Response) => {
  try {
    const boxes = await database("boxes").select("*");

    res.send(boxes);
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
