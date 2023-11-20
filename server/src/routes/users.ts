import { Router } from "express";
import {
  usersGetMany,
  usersGetOne,
  usersPatchOne,
  usersPatchPasswordOne,
  usersPostOne,
} from "../endpoints/user";
import auth from "../middlewares/auth";
import validation from "../middlewares/validation";
import {
  usersGetOneValidation,
  usersPatchPasswordValidation,
  usersPatchValidation,
  usersPostValidation,
} from "../validations/users";

const router = Router();

router.get("/users", auth, usersGetMany);
router.get(
  "/users/:user_id",
  auth,
  validation(usersGetOneValidation, "params"),
  usersGetOne,
);
router.post("/users", auth, validation(usersPostValidation), usersPostOne);
router.patch("/users", auth, validation(usersPatchValidation), usersPatchOne);
router.patch(
  "/users/reset-password",
  auth,
  validation(usersPatchPasswordValidation),
  usersPatchPasswordOne,
);

export default router;
