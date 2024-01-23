import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("password_resets", table => {
    table.integer("user_id").notNullable();
    table.string("token").notNullable();
    table.timestamp("token_expires").notNullable();

    table
      .foreign(["user_id"])
      .references(["user_id"])
      .inTable("users")
      .onDelete("no action")
      .onUpdate("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("password_resets");
}
