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

// src/routes/boxes.ts
var boxes_exports = {};
__export(boxes_exports, {
  default: () => boxes_default
});
module.exports = __toCommonJS(boxes_exports);
var import_express = require("express");

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
  const mustApplyPagination = Number(items) !== 0;
  if (mustApplyPagination && items)
    query = query.limit(Number(items));
  if (mustApplyPagination && items && page)
    query = query.offset(Number(items) * (Number(page) - 1));
  const count = await database(queryBuilder._single.table).count("*", { as: "total" }).first();
  return { items: await query, total: Number(count?.total) };
}

// src/endpoints/boxes.ts
var boxesGetMany = async (req, res) => {
  const { shelf_id } = req.query;
  try {
    let query = database("boxes as bx").leftJoin("shelfs as s", "bx.shelf_id", "s.shelf_id").leftJoin("bookcases as bc", "s.bookcase_id", "bc.bookcase_id").select(
      "bc.name as bookcase_name",
      "s.name as shelf_name",
      "bc.bookcase_id",
      "bx.*"
    );
    if (shelf_id)
      query = query.where("bx.shelf_id", shelf_id);
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query
    });
    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var boxesPostOne = async (req, res) => {
  const body = req.body;
  const { user_id } = req;
  try {
    const [insertedBox] = await database("boxes").insert(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Caixa "${body.name}" criada com sucesso`,
      method: "POST"
    });
    res.send(insertedBox);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var boxesPatchOne = async (req, res) => {
  const { box_id } = req.params;
  const body = req.body;
  const { user_id } = req;
  try {
    const existBox = await database("boxes").where({ box_id }).first();
    if (!existBox) {
      res.status(404).send({ error: "Caixa n\xE3o encontrada" });
      return;
    }
    const [updatedBox] = await database("boxes").where({ box_id }).update(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Caixa "${updatedBox.name}" atualizada com sucesso`,
      method: "POST"
    });
    res.send(updatedBox);
  } catch (error) {
    console.error(error);
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

// src/validations/index.ts
var import_joi2 = __toESM(require("joi"));
var getManyValidation = import_joi2.default.object({
  items: import_joi2.default.string(),
  page: import_joi2.default.string(),
  searchColumn: import_joi2.default.string(),
  searchQuery: import_joi2.default.string(),
  orderColumn: import_joi2.default.string(),
  orderOrientation: import_joi2.default.string().valid("ASC", "DESC")
});

// src/validations/boxes.ts
var import_joi3 = __toESM(require("joi"));
var boxesPostOneValidation = import_joi3.default.object({
  name: import_joi3.default.string().required(),
  shelf_id: import_joi3.default.number().required()
});
var boxesGetManyValidation = import_joi3.default.object({
  shelf_id: import_joi3.default.number()
});
var boxesGetOneValidation = import_joi3.default.object({
  box_id: import_joi3.default.number().required()
});
var boxesPatchOneValidation = import_joi3.default.object({
  name: import_joi3.default.string(),
  shelf_id: import_joi3.default.number(),
  active: import_joi3.default.boolean()
});

// src/routes/boxes.ts
var router = (0, import_express.Router)();
router.get(
  "/boxes",
  auth,
  validation([getManyValidation, boxesGetManyValidation], "query"),
  boxesGetMany
);
router.post("/boxes", auth, validation(boxesPostOneValidation), boxesPostOne);
router.patch(
  "/boxes/:box_id",
  auth,
  validation(boxesGetOneValidation, "params"),
  validation(boxesPatchOneValidation),
  boxesPatchOne
);
var boxes_default = router;
