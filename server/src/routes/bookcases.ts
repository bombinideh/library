import { Router } from "express";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import {
  bookcasesGetMany,
  bookcasesPatchOne,
  bookcasesPostOne,
} from "../endpoints/bookcases";
import { getManyValidation } from "../validations";
import {
  bookcasesGetOneValidation,
  bookcasesPatchOneValidation,
  bookcasesPostOneValidation,
} from "../validations/bookcases";

const router = Router();

router.get(
  "/bookcases",
  auth,
  validation(getManyValidation, "query"),
  bookcasesGetMany,
);
router.post(
  "/bookcases",
  auth,
  validation(bookcasesPostOneValidation),
  bookcasesPostOne,
);
router.patch(
  "/bookcases/:bookcase_id",
  auth,
  validation(bookcasesGetOneValidation, "params"),
  validation(bookcasesPatchOneValidation),
  bookcasesPatchOne,
);

export default router;
