import Express from "express";
import "dotenv/config";
import { readdirSync } from "fs";
import { join } from "path";
import cors from "cors";

const app = Express();
const PORT = Number(process.env.PORT) || 3000;
const routes = readdirSync(join(__dirname, "routes"));

app.use(cors());
app.use(Express.json());
app.listen(`${PORT}`, () => console.log(`🚀 Server running on port ${PORT}`));

for (const route of routes) {
  app.use(require(join(__dirname, "routes", route)).default);
}
