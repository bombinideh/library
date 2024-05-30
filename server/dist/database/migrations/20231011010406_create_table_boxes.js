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

// database/migrations/20231011010406_create_table_boxes.ts
var create_table_boxes_exports = {};
__export(create_table_boxes_exports, {
  down: () => down,
  up: () => up
});
module.exports = __toCommonJS(create_table_boxes_exports);
async function up(knex) {
  await knex.schema.createTable("boxes", (table) => {
    table.increments("box_id").primary().notNullable();
    table.string("name").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.integer("shelf_id").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.foreign(["shelf_id"]).references(["shelf_id"]).inTable("shelfs").onDelete("cascade").onUpdate("cascade");
  });
}
async function down(knex) {
  await knex.schema.dropTable("boxes");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  down,
  up
});
