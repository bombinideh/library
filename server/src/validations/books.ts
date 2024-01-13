import Joi from "joi";

export const book = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publisher: Joi.string().required(),
  year_publication: Joi.number(),
  number_pages: Joi.number().required(),
  observation: Joi.string(),
  amount: Joi.number(),
});

export const booksPostOneValidation = Joi.object({
  bookcase_id: Joi.number().required(),
  shelf_id: Joi.number().required(),
  box_id: Joi.number().required(),
}).concat(book);

export const booksGetOneValidation = Joi.object({
  book_id: Joi.number().required(),
});

export const booksPatchOneValidation = Joi.object({
  bookcase_id: Joi.number(),
  shelf_id: Joi.number(),
  box_id: Joi.number(),
}).concat(book);

export const booksPostManyValidation = Joi.object({
  bookcase_id: Joi.number().required(),
  shelf_id: Joi.number().required(),
  box_id: Joi.number().required(),
  books: Joi.array().items(book).min(1).required(),
});
