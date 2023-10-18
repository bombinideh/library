import { Router } from "express";
import { signInPostBody } from "../validations/auth";
import validation from "../middlewares/validation";
import { signIn } from "../endpoints/auth";

const router = Router();

router.post("/sign-in", validation(signInPostBody), signIn);

export default router;
