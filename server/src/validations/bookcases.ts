import Joi from "joi";

export const bookcasesPostOneValidation = Joi.object({
  name: Joi.string().required(),
});

export const bookcasesGetOneValidation = Joi.object({
  bookcase_id: Joi.number().required(),
});

export const bookcasesPatchOneValidation = Joi.object({
  name: Joi.string(),
  active: Joi.boolean(),
});
