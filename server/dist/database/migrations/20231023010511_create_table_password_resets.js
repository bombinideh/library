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

// database/migrations/20231023010511_create_table_password_resets.ts
var create_table_password_resets_exports = {};
__export(create_table_password_resets_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(create_table_password_resets_exports);
async function up(knex) {
  return knex.schema.createTable("password_resets", (table) => {
    table.integer("user_id").notNullable();
    table.string("token").notNullable();
    table.timestamp("token_expires").notNullable();
    table.foreign(["user_id"]).references(["user_id"]).inTable("users").onDelete("no action").onUpdate("cascade");
  });
}
async function down(knex) {
  return knex.schema.dropTable("password_resets");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
