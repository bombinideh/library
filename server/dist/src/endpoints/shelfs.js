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

// src/endpoints/shelfs.ts
var shelfs_exports = {};
__export(shelfs_exports, {
  shelfsGetMany: () => shelfsGetMany,
  shelfsPatchOne: () => shelfsPatchOne,
  shelfsPostOne: () => shelfsPostOne
});
module.exports = __toCommonJS(shelfs_exports);

// src/knex.ts
var import_knex = __toESM(require("knex"));
var database = (0, import_knex.default)({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
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
  if (items)
    query = query.limit(Number(items));
  if (items && page)
    query = query.offset(Number(items) * (Number(page) - 1));
  const count = await database(queryBuilder._single.table).count("*", { as: "total" }).first();
  return { items: await query, total: Number(count?.total) };
}

// src/endpoints/shelfs.ts
var shelfsGetMany = async (req, res) => {
  const { bookcase_id } = req.query;
  try {
    let query = database("shelfs as s").leftJoin("bookcases as bc", "s.bookcase_id", "bc.bookcase_id").select("bc.name as bookcase_name", "s.*");
    if (bookcase_id)
      query = query.where("s.bookcase_id", bookcase_id);
    const result = await processQueryThatFindMany({
      queryBuilder: query,
      queryParams: req.query
    });
    res.send(result);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var shelfsPostOne = async (req, res) => {
  const body = req.body;
  const { user_id } = req;
  try {
    const [insertedShelf] = await database("shelfs").insert(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Prateleira "${body.name}" criado com sucesso`,
      method: "POST"
    });
    res.send(insertedShelf);
  } catch (error) {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var shelfsPatchOne = async (req, res) => {
  const { shelf_id } = req.params;
  const body = req.body;
  const { user_id } = req;
  try {
    const existShelf = await database("shelfs").where({ shelf_id }).first();
    if (!existShelf) {
      res.status(404).send({ error: "Estante n\xE3o encontrada" });
      return;
    }
    const [updatedShelf] = await database("shelfs").where({ shelf_id }).update(body).returning("*");
    await database("logs").insert({
      user_id,
      description: `Prateleira "${updatedShelf.name}" atualizada com sucesso`,
      method: "PATCH"
    });
    res.send(updatedShelf);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shelfsGetMany,
  shelfsPatchOne,
  shelfsPostOne
});
