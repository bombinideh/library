import { Router } from "express";
import { boxesGetMany, boxesPatchOne, boxesPostOne } from "../endpoints/boxes";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import { getManyValidation } from "../validations";
import {
  boxesGetManyValidation,
  boxesGetOneValidation,
  boxesPatchOneValidation,
  boxesPostOneValidation,
} from "../validations/boxes";

const router = Router();

router.get(
  "/boxes",
  auth,
  validation([getManyValidation, boxesGetManyValidation], "query"),
  boxesGetMany,
);
router.post("/boxes", auth, validation(boxesPostOneValidation), boxesPostOne);
router.patch(
  "/boxes/:box_id",
  auth,
  validation(boxesGetOneValidation, "params"),
  validation(boxesPatchOneValidation),
  boxesPatchOne,
);

export default router;
