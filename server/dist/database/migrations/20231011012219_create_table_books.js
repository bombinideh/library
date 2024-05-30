"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// database/migrations/20231011012219_create_table_books.ts
var create_table_books_exports = {};
__export(create_table_books_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(create_table_books_exports);
async function up(knex) {
  await knex.schema.createTable("books", (table) => {
    table.increments("book_id").primary().notNullable();
    table.integer("user_id").notNullable();
    table.integer("bookcase_id").notNullable();
    table.integer("shelf_id").notNullable();
    table.integer("box_id").notNullable();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("publisher").notNullable();
    table.integer("year_publication");
    table.integer("number_pages").notNullable();
    table.string("observation");
    table.integer("amount").notNullable().defaultTo(1);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.foreign(["user_id"]).references(["user_id"]).inTable("users").onDelete("no action").onUpdate("cascade");
    table.foreign(["bookcase_id"]).references(["bookcase_id"]).inTable("bookcases").onDelete("no action").onUpdate("cascade");
    table.foreign(["shelf_id"]).references(["shelf_id"]).inTable("shelfs").onDelete("no action").onUpdate("cascade");
    table.foreign(["box_id"]).references(["box_id"]).inTable("boxes").onDelete("no action").onUpdate("cascade");
  });
}
async function down(knex) {
  await knex.schema.dropTable("books");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
