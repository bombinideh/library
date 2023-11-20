import Joi from "joi";

export const logsGetManyValidation = Joi.object({
  bookcase_id: Joi.string(),
});

export const logsGetOneValidation = Joi.object({
  shelf_id: Joi.number().required(),
});


