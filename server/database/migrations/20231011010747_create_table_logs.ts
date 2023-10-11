import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("logs", (table) => {
    table.increments("log_id").primary().notNullable();
    table.integer("user_id").notNullable();
    table.string("description").notNullable();
    table.string("method").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("no action")
      .onUpdate("cascade");
  });

  await knex.schema.raw(`
  alter table "logs"
  add constraint "ck_logs_method" check ("method" in ('GET', 'POST', 'PUT', 'PATCH', 'DELETE'));
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("logs");
}
