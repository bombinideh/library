import { Router } from "express";
import { booksGetMany, booksPatchOne, booksPostOne } from "../endpoints/books";
import {
  booksGetManyValidation,
  booksGetOneValidation,
  booksPatchOneValidation,
  booksPostOneValidation,
} from "../validations/books";
import validation from "../middlewares/validation";
import auth from "../middlewares/auth";

const router = Router();

router.get(
  "/books",
  auth,
  validation(booksGetManyValidation, "query"),
  booksGetMany
);
router.post("/books", auth, validation(booksPostOneValidation), booksPostOne);
router.patch(
  "/books/:book_id",
  auth,
  validation(booksGetOneValidation, "params"),
  validation(booksPatchOneValidation),
  booksPatchOne
);

export default router;
