import Joi from "joi";

export const shelfsPostOneValidation = Joi.object({
  name: Joi.string().required(),
  bookcase_id: Joi.number().required(),
});

export const shelfsGetManyValidation = Joi.object({
  bookcase_id: Joi.string(),
});

export const shelfsGetOneValidation = Joi.object({
  shelf_id: Joi.number().required(),
});

export const shelfsPatchOneValidation = Joi.object({
  name: Joi.string(),
  bookcase_id: Joi.number(),
  active: Joi.boolean(),
});
