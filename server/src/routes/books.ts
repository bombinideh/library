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
  booksGetOneValidation,
  booksPatchOneValidation,
  booksPostOneValidation,
} from "../validations/books";
import { getManyValidation } from "../validations";

const router = Router();

router.get("/books", auth, validation(getManyValidation, "query"), booksGetMany);
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
