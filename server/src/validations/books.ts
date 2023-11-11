import Joi from "joi";

export const booksGetManyValidation = Joi.object({
  items: Joi.string(),
  page: Joi.string(),
  searchColumn: Joi.string(),
  searchQuery: Joi.string(),
});

export const booksPostOneValidation = Joi.object({
  bookcase_name: Joi.string().required(),
  shelf_name: Joi.string().required(),
  box_name: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  publisher: Joi.string().required(),
  year_publication: Joi.number(),
  number_pages: Joi.number().required(),
  observation: Joi.string(),
  amount: Joi.number(),
});

export const booksGetOneValidation = Joi.object({
  book_id: Joi.number().required(),
});

export const booksPatchOneValidation = Joi.object({
  bookcase_id: Joi.number(),
  shelf_id: Joi.number(),
  box_id: Joi.number(),
  title: Joi.string(),
  author: Joi.string(),
  publisher: Joi.string(),
  year_publication: Joi.number(),
  number_pages: Joi.number(),
  observation: Joi.string(),
  amount: Joi.number(),
});
