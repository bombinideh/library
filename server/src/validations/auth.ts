import Joi from "joi";

export const signInPostBody = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required();

export const forgotPasswordPostBody = Joi.object({
  email: Joi.string().email().required(),
  url: Joi.string().required(),
}).required();

export const resetPasswordPostBody = Joi.object({
  user_id: Joi.number().required(),
  password: Joi.string().min(6).required(),
  token: Joi.string().required(),
}).required();
