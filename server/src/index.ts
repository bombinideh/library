import Express from "express";
import "dotenv/config";
import { database } from "./knex";

const app = Express();
const PORT = Number(process.env.PORT) || 3000;

app.get("/", async (req, res) => {
  const data = await database.from("teste").select("*");

  res.send(data);
});

app.use(Express.json());
app.listen(`${PORT}`, () => console.log(`Server running on port ${PORT}`));
