import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src", "./database"],
  outDir: "./dist",
  clean: true,
});
