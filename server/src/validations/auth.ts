import Joi from "joi";

export const signInPostBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required();
