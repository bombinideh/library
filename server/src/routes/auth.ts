import { Router } from "express";
import {
  forgotPasswordPostBody,
  resetPasswordPostBody,
  signInPostBody,
} from "../validations/auth";
import validation from "../middlewares/validation";
import {
  forgotPassword,
  getAuthenticatedUser,
  resetPassword,
  signIn,
} from "../endpoints/auth";
import auth from "../middlewares/auth";

const router = Router();

router.post("/sign-in", validation(signInPostBody), signIn);
router.post("/forgot-password", validation(forgotPasswordPostBody), forgotPassword);
router.post("/reset-password", validation(resetPasswordPostBody), resetPassword);
router.get("/me", auth, getAuthenticatedUser);

export default router;
