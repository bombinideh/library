import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type Schema = Joi.ObjectSchema;

export default function validation(
  JoiSchema: Schema | [Schema, Schema],
  schemaType: "body" | "params" | "query" = "body",
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = async (schema: Schema) =>
        schema.validateAsync(req[schemaType]);

      if (Array.isArray(JoiSchema))
        await validate(JoiSchema[0].concat(JoiSchema[1]));
      else await validate(JoiSchema);

      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError)
        return res.status(400).send({ error: error.details[0].message });

      return res.status(400).send({ error: "Erro de validação" });
    }
  };
}
