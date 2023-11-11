import { Router } from "express";
import {
  booksDeleteOne,
  booksGetMany,
  booksPatchOne,
  booksPostOne,
} from "../endpoints/books";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import {
  booksGetManyValidation,
  booksGetOneValidation,
  booksPatchOneValidation,
  booksPostOneValidation,
} from "../validations/books";

const router = Router();

router.get(
  "/books",
  auth,
  validation(booksGetManyValidation, "query"),
  booksGetMany,
);
router.post("/books", auth, validation(booksPostOneValidation), booksPostOne);
router.patch(
  "/books/:book_id",
  auth,
  validation(booksGetOneValidation, "params"),
  validation(booksPatchOneValidation),
  booksPatchOne,
);
router.delete(
  "/books/:book_id",
  auth,
  validation(booksGetOneValidation, "params"),
  booksDeleteOne,
);

export default router;
