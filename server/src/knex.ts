import knex, { Knex } from "knex";

const connection = process.env.POSTGRES_URL
  ? process.env.POSTGRES_URL
  : ({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    } satisfies Knex.Config["connection"]);

export const database = knex({
  client: "pg",
  connection,
});
