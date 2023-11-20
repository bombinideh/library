import { Router } from "express";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import { getManyValidation } from "../validations";
import { logsGetMany } from "../endpoints/logs";

const router = Router();

router.get("/logs", auth, validation(getManyValidation, "query"), logsGetMany);

export default router;
