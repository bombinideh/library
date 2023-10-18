import { Router } from "express";
import validation from "../middlewares/validation";
import {
  usersGetMany,
  usersGetOne,
  usersPatchOne,
  usersPostOne,
} from "../endpoints/user";
import {
  usersGetManyValidation,
  usersPatchValidation,
  usersPostValidation,
} from "../validations/users";
import auth from "../middlewares/auth";

const router = Router();

router.get("/users", auth, validation(usersGetManyValidation), usersGetMany);
router.get("/users/:id", auth, usersGetOne);
router.post("/users", auth, validation(usersPostValidation), usersPostOne);
router.patch(
  "/users/:id",
  auth,
  validation(usersPatchValidation),
  usersPatchOne
);

export default router;
