import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function validation(
  JoiSchema: Joi.ObjectSchema,
  schemaType: "body" | "params" | "query" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await JoiSchema.validateAsync(req[schemaType]);

      next();
    } catch (err: Joi.ValidationError | any) {
      res.status(400).send({ error: err.details[0].message });
    }
  };
}
