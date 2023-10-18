import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("books", (table) => {
    table.increments("book_id").primary().notNullable();
    table.integer("user_id").notNullable();
    table.integer("bookcase_id").notNullable();
    table.integer("shelf_id").notNullable();
    table.integer("box_id").notNullable();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("publisher").notNullable();
    table.integer("year_publication").notNullable();
    table.integer("number_pages").notNullable();
    table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign(["user_id"])
      .references(["user_id"])
      .inTable("users")
      .onDelete("no action")
      .onUpdate("cascade");

    table
      .foreign(["bookcase_id"])
      .references(["bookcase_id"])
      .inTable("bookcases")
      .onDelete("no action")
      .onUpdate("cascade");

    table
      .foreign(["shelf_id"])
      .references(["shelf_id"])
      .inTable("shelfs")
      .onDelete("no action")
      .onUpdate("cascade");

    table
      .foreign(["box_id"])
      .references(["box_id"])
      .inTable("boxes")
      .onDelete("no action")
      .onUpdate("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("books");
}