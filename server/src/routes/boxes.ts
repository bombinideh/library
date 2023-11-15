import { Router } from "express";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import { boxesGetMany, boxesPatchOne, boxesPostOne } from "../endpoints/boxes";
import {
  boxesGetOneValidation,
  boxesPatchOneValidation,
  boxesPostOneValidation,
} from "../validations/boxes";
import { getManyValidation } from "../validations";

const router = Router();

router.get("/boxes", auth, validation(getManyValidation, "query"), boxesGetMany);
router.post("/boxes", auth, validation(boxesPostOneValidation), boxesPostOne);
router.patch(
  "/boxes/:boxes_id",
  auth,
  validation(boxesGetOneValidation, "params"),
  validation(boxesPatchOneValidation),
  boxesPatchOne,
);

export default router;
