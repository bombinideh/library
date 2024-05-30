import dotenv from "dotenv";
import type { Knex } from "knex";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const connection = process.env.POSTGRES_URL
  ? process.env.POSTGRES_URL
  : ({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    } satisfies Knex.Config["connection"]);

const config: Knex.Config = {
  client: "pg",
  connection,
};

module.exports = config;
