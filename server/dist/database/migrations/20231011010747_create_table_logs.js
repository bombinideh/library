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

// database/migrations/20231011010747_create_table_logs.ts
var create_table_logs_exports = {};
__export(create_table_logs_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(create_table_logs_exports);
async function up(knex) {
  await knex.schema.createTable("logs", (table) => {
    table.increments("log_id").primary().notNullable();
    table.integer("user_id").notNullable();
    table.string("description").notNullable();
    table.string("method").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.foreign("user_id").references("user_id").inTable("users").onDelete("no action").onUpdate("cascade");
  });
  await knex.schema.raw(`
  alter table "logs"
  add constraint "ck_logs_method" check ("method" in ('GET', 'POST', 'PUT', 'PATCH', 'DELETE'));
  `);
}
async function down(knex) {
  await knex.schema.dropTable("logs");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
