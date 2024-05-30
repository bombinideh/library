"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/users.ts
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);
var import_express = require("express");

// src/endpoints/user.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/knex.ts
var import_knex = __toESM(require("knex"));
var connection = process.env.POSTGRES_URL ? process.env.POSTGRES_URL : {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};
var database = (0, import_knex.default)({
  client: "pg",
  connection
});

// src/functions/existUser.ts
var existUser = async (param) => {
  const filter = typeof param === "string" ? { email: param } : { user_id: param };
  return database("users").select("*").where(filter).first();
};

// src/functions/processQueryThatFindMany.ts
var defaultQueryParams = {
  items: 10,
  page: 1,
  orderColumn: "created_at",
  orderOrientation: "DESC"
};
async function processQueryThatFindMany({
  queryBuilder,
  queryParams
}) {
  const { searchColumn, searchQuery, items, page, orderColumn, orderOrientation } = {
    ...defaultQueryParams,
    ...queryParams
  };
  let query = database.with("query", queryBuilder).from("query");
  if (searchColumn && searchQuery) {
    const register = await query.clone().first();
    if (searchColumn in register)
      query = query.whereRaw(`${searchColumn}::TEXT ILIKE '%${searchQuery}%'`);
  }
  query = query.orderBy(orderColumn, orderOrientation);
  if (items)
    query = query.limit(Number(items));
  if (items && page)
    query = query.offset(Number(items) * (Number(page) - 1));
  const count = await database(queryBuilder._single.table).count("*", { as: "total" }).first();
  return { items: await query, total: Number(count?.total) };
}

// src/endpoints/user.ts
var usersGetMany = async (req, res) => {
  try {
    const query = database("users as u");
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query
    });
    result.items = result.items.map((user) => {
      delete user.password;
      return user;
    });
    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var usersGetOne = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await database("users").whereRaw(`user_id = ${user_id}`).first();
    if (!user)
      return res.status(404).send({ error: "Usu\xE1rio n\xE3o encontrado" });
    delete user.password;
    res.send(user);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var usersPostOne = async (req, res) => {
  const user = req.body;
  try {
    if (await existUser(user.email))
      return res.status(400).send({ error: "Email j\xE1 existente" });
    const passwordHash = await import_bcryptjs.default.hash(user.password, 10);
    const [insertedUser] = await database("users").insert({ ...user, password: passwordHash }).returning("*");
    await database("logs").insert({
      user_id: insertedUser.user_id,
      description: `Usu\xE1rio "${user.name}" criado com sucesso`,
      method: "POST"
    });
    delete insertedUser.password;
    res.status(201).send(insertedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};
var usersPatchOne = async (req, res) => {
  const { user_id } = req;
  const body = req.body;
  try {
    const user = await database("users").where("user_id", user_id).first();
    if (!user)
      return res.status(404).send({ error: "Usu\xE1rio n\xE3o encontrado" });
    if (body.email && await existUser(body.email))
      return res.status(400).send({ error: "Email j\xE1 existente" });
    const [updatedUser] = await database("users").whereRaw(`user_id = ${user_id}`).update(body).returning("*");
    delete updatedUser.password;
    res.send(updatedUser);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var usersPatchPasswordOne = async (req, res) => {
  const {
    currentPassword,
    newPassword,
    newPasswordConfirm
  } = req.body;
  const { user_id } = req;
  try {
    const user = await database("users").where({ user_id }).first();
    if (!user)
      return res.status(404).send({ error: "Usu\xE1rio n\xE3o encontrado" });
    const isCorrectPassword = await import_bcryptjs.default.compare(currentPassword, user.password);
    if (!isCorrectPassword)
      return res.status(400).send({ error: "A senha atual est\xE1 incorreta" });
    if (currentPassword === newPassword)
      return res.status(400).send({ error: "Digite uma senha diferente da atual" });
    if (newPassword !== newPasswordConfirm)
      return res.status(400).send({ error: "A confirma\xE7\xE3o da nova senha \xE9 inv\xE1lida" });
    const passwordHash = await import_bcryptjs.default.hash(newPassword, 10);
    const [updatedUser] = await database("users").where({ user_id }).update({ password: passwordHash }).returning("*");
    delete updatedUser.password;
    res.send(updatedUser);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

// src/middlewares/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "token not provided" });
    return;
  }
  const scheme = "Bearer ";
  if (!authorization.startsWith(scheme)) {
    res.status(401).send({ error: "token malformatted" });
    return;
  }
  const token = authorization.replace(scheme, "");
  import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "token invalid" });
      return;
    }
    req.user_id = decoded.user_id;
    next();
  });
}

// src/middlewares/validation.ts
var import_joi = __toESM(require("joi"));
function validation(JoiSchema, schemaType = "body") {
  return async (req, res, next) => {
    try {
      const validate = async (schema) => schema.validateAsync(req[schemaType]);
      if (Array.isArray(JoiSchema))
        await validate(JoiSchema[0].concat(JoiSchema[1]));
      else
        await validate(JoiSchema);
      next();
    } catch (error) {
      if (error instanceof import_joi.default.ValidationError)
        return res.status(400).send({ error: error.details[0].message });
      return res.status(400).send({ error: "Erro de valida\xE7\xE3o" });
    }
  };
}

// src/validations/users.ts
var import_joi2 = __toESM(require("joi"));
var usersGetOneValidation = import_joi2.default.object({
  user_id: import_joi2.default.number()
}).required();
var usersPostValidation = import_joi2.default.object({
  name: import_joi2.default.string().min(3).max(30).required(),
  email: import_joi2.default.string().email().required(),
  password: import_joi2.default.string().min(6).required()
}).required();
var usersPatchValidation = import_joi2.default.object({
  name: import_joi2.default.string().min(3).max(30),
  email: import_joi2.default.string().email(),
  active: import_joi2.default.boolean()
}).required();
var usersPatchPasswordValidation = import_joi2.default.object({
  currentPassword: import_joi2.default.string().min(6).required(),
  newPassword: import_joi2.default.string().min(6).required(),
  newPasswordConfirm: import_joi2.default.string().min(6).required()
}).required();

// src/routes/users.ts
var router = (0, import_express.Router)();
router.get("/users", auth, usersGetMany);
router.get(
  "/users/:user_id",
  auth,
  validation(usersGetOneValidation, "params"),
  usersGetOne
);
router.post("/users", auth, validation(usersPostValidation), usersPostOne);
router.patch("/users", auth, validation(usersPatchValidation), usersPatchOne);
router.patch(
  "/users/reset-password",
  auth,
  validation(usersPatchPasswordValidation),
  usersPatchPasswordOne
);
var users_default = router;
