import Joi from "joi";

export const boxesPostOneValidation = Joi.object({
  name: Joi.string().required(),
  shelf_id: Joi.number().required(),
});

export const boxesGetOneValidation = Joi.object({
  box_id: Joi.number().required(),
});

export const boxesPatchOneValidation = Joi.object({
  name: Joi.string(),
  shelf_id: Joi.number(),
  active: Joi.boolean(),
});
