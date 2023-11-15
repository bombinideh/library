import { Router } from "express";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import { getManyValidation } from "../validations";
import { shelfsGetMany, shelfsPatchOne, shelfsPostOne } from "../endpoints/shelfs";
import {
  shelfsGetOneValidation,
  shelfsPatchOneValidation,
  shelfsPostOneValidation,
} from "../validations/shelfs";

const router = Router();

router.get("/shelfs", auth, validation(getManyValidation, "query"), shelfsGetMany);
router.post("/shelfs", auth, validation(shelfsPostOneValidation), shelfsPostOne);
router.patch(
  "/shelfs/:shelf_id",
  auth,
  validation(shelfsGetOneValidation, "params"),
  validation(shelfsPatchOneValidation),
  shelfsPatchOne,
);

export default router;
