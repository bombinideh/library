import { Router } from "express";
import {
  booksDeleteOne,
  booksGetMany,
  booksPatchOne,
  booksPostMany,
  booksPostOne,
} from "../endpoints/books";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import { getManyValidation } from "../validations";
import {
  booksGetOneValidation,
  booksPatchOneValidation,
  booksPostManyValidation,
  booksPostOneValidation,
} from "../validations/books";

const router = Router();

router.get("/books", validation(getManyValidation, "query"), booksGetMany);
router.post("/books", auth, validation(booksPostOneValidation), booksPostOne);
router.post("/books/many", auth, validation(booksPostManyValidation), booksPostMany);
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
