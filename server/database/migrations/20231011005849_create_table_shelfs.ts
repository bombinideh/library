import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("shelfs", table => {
    table.increments("shelf_id").primary().notNullable();
    table.string("name").notNullable();
    table.integer("bookcase_id").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign(["bookcase_id"])
      .references(["bookcase_id"])
      .inTable("bookcases")
      .onDelete("cascade")
      .onUpdate("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("shelfs");
}
