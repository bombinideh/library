import knex from "knex";

interface Connection {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

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
