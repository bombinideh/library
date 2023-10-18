import Joi from "joi";

export const usersGetManyValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
}).required();

export const usersGetOneValidation = Joi.object({
  user_id: Joi.number(),
}).required();

export const usersPostValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required();

export const usersPatchValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  active: Joi.boolean(),
}).required();
