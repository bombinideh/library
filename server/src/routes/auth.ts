import { Router } from "express";
import {
  forgotPasswordPostBody,
  resetPasswordPostBody,
  signInPostBody,
} from "../validations/auth";
import validation from "../middlewares/validation";
import { forgotPassword, resetPassword, signIn } from "../endpoints/auth";

const router = Router();

router.post("/sign-in", validation(signInPostBody), signIn);
router.post(
  "/forgot-password",
  validation(forgotPasswordPostBody),
  forgotPassword
);
router.post(
  "/reset-password",
  validation(resetPasswordPostBody),
  resetPassword
);

export default router;
