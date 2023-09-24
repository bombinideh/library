import knex from "knex";

const connectionOptions = [
  "host",
  "port",
  "user",
  "password",
  "database",
] as const;
type Connection = Record<(typeof connectionOptions)[number], string>;

export const database = knex({
  client: "pg",
  connection: <Connection>{
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
