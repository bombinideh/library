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

// src/endpoints/bookcases.ts
var bookcases_exports = {};
__export(bookcases_exports, {
  bookcasesGetMany: () => bookcasesGetMany,
  bookcasesPatchOne: () => bookcasesPatchOne,
  bookcasesPostOne: () => bookcasesPostOne
});
module.exports = __toCommonJS(bookcases_exports);

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

// src/endpoints/bookcases.ts
var bookcasesGetMany = async (req, res) => {
  try {
    const query = database("bookcases as bc");
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query
    });
    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var bookcasesPostOne = async (req, res) => {
  const body = req.body;
  const { user_id } = req;
  try {
    const bookcase = await database("bookcases").where("name", body.name).first();
    if (bookcase)
      return res.status(400).json({ error: "Uma estante com esse nome j\xE1 existe" });
    const [insertedBookcase] = await database("bookcases").insert(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Estante "${body.name}" criada com sucesso`,
      method: "POST"
    });
    res.status(201).send(insertedBookcase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
};
var bookcasesPatchOne = async (req, res) => {
  const { bookcase_id } = req.params;
  const body = req.body;
  const { user_id } = req;
  try {
    const bookcase = await database("bookcases").where("bookcase_id", bookcase_id).first();
    if (!bookcase)
      return res.status(404).send({ error: "Estante n\xE3o encontrada" });
    const [updatedBookcase] = await database("bookcases").where({ bookcase_id }).update(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Estante "${bookcase.name}" atualizada com sucesso`,
      method: "PATCH"
    });
    res.send(updatedBookcase);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bookcasesGetMany,
  bookcasesPatchOne,
  bookcasesPostOne
});
