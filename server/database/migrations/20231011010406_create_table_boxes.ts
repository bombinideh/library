import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("boxes", table => {
    table.increments("box_id").primary().notNullable();
    table.string("name").notNullable();
    table.boolean("active").notNullable().defaultTo(true);
    table.integer("shelf_id").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign(["shelf_id"])
      .references(["shelf_id"])
      .inTable("shelfs")
      .onDelete("cascade")
      .onUpdate("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("boxes");
}
