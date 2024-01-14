import Joi from "joi";

export const getManyValidation = Joi.object({
  items: Joi.string(),
  page: Joi.string(),
  searchColumn: Joi.string(),
  searchQuery: Joi.string(),
  orderColumn: Joi.string(),
  orderOrientation: Joi.string().valid("ASC", "DESC"),
});
