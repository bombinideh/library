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

// src/functions/findUniqueBook.ts
var findUniqueBook_exports = {};
__export(findUniqueBook_exports, {
  findUniqueBook: () => findUniqueBook
});
module.exports = __toCommonJS(findUniqueBook_exports);

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

// src/functions/findUniqueBook.ts
var findUniqueBook = async ({ title, author }) => {
  return database("books").select("*").whereILike("title", `%${title}%`).andWhereILike("author", `%${author}%`).first();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findUniqueBook
});
