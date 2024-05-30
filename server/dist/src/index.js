"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_config = require("dotenv/config");
var import_fs = require("fs");
var import_path = require("path");
var import_cors = __toESM(require("cors"));
var app = (0, import_express.default)();
var PORT = Number(process.env.PORT) || 3e3;
var routes = (0, import_fs.readdirSync)((0, import_path.join)(__dirname, "routes"));
app.use((0, import_cors.default)());
app.use(import_express.default.json());
app.listen(`${PORT}`, () => console.log(`\u{1F680} Server running on port ${PORT}`));
for (const route of routes) {
  app.use(require((0, import_path.join)(__dirname, "routes", route)).default);
}
