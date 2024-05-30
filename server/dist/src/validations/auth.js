"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/validations/auth.ts
var auth_exports = {};
__export(auth_exports, {
  forgotPasswordPostBody: () => forgotPasswordPostBody,
  resetPasswordPostBody: () => resetPasswordPostBody,
  signInPostBody: () => signInPostBody
});
module.exports = __toCommonJS(auth_exports);
var import_joi = __toESM(require("joi"));
var signInPostBody = import_joi.default.object({
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().min(6).required()
}).required();
var forgotPasswordPostBody = import_joi.default.object({
  email: import_joi.default.string().email().required(),
  url: import_joi.default.string().required()
}).required();
var resetPasswordPostBody = import_joi.default.object({
  user_id: import_joi.default.number().required(),
  password: import_joi.default.string().min(6).required(),
  token: import_joi.default.string().required()
}).required();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  forgotPasswordPostBody,
  resetPasswordPostBody,
  signInPostBody
});
