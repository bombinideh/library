import Express from "express";
import "dotenv/config";
import { database } from "./knex";

const app = Express();

app.get("/", async (req, res) => {
  const data = await database.from("test").select("*");

  res.send(data);
});

app.use(Express.json());
app.listen(3000, () => console.log("Server running on port 3000"));
