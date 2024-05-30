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

// src/routes/auth.ts
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default
});
module.exports = __toCommonJS(auth_exports);
var import_express = require("express");

// src/validations/auth.ts
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

// src/middlewares/validation.ts
var import_joi2 = __toESM(require("joi"));
function validation(JoiSchema, schemaType = "body") {
  return async (req, res, next) => {
    try {
      const validate = async (schema) => schema.validateAsync(req[schemaType]);
      if (Array.isArray(JoiSchema))
        await validate(JoiSchema[0].concat(JoiSchema[1]));
      else
        await validate(JoiSchema);
      next();
    } catch (error) {
      if (error instanceof import_joi2.default.ValidationError)
        return res.status(400).send({ error: error.details[0].message });
      return res.status(400).send({ error: "Erro de valida\xE7\xE3o" });
    }
  };
}

// src/endpoints/auth.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_crypto = __toESM(require("crypto"));
var import_nodemailer = __toESM(require("nodemailer"));

// src/knex.ts
var import_knex = __toESM(require("knex"));
var connection = process.env.POSTGRES_URL ? process.env.POSTGRES_URL : {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};
var database = (0, import_knex.default)({
  client: "pg",
  connection
});

// src/functions/existUser.ts
var existUser = async (param) => {
  const filter = typeof param === "string" ? { email: param } : { user_id: param };
  return database("users").select("*").where(filter).first();
};

// src/functions/generateToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var generateToken = (user_id) => {
  return import_jsonwebtoken.default.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// src/endpoints/auth.ts
var signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await existUser(email);
    if (!user) {
      res.status(400).send({ error: "Usu\xE1rio n\xE3o encontrado" });
      return;
    }
    if (!user.active) {
      res.status(400).send({ error: "Usu\xE1rio desativado" });
      return;
    }
    const isCorrectPassword = await import_bcryptjs.default.compare(password, user.password);
    if (!isCorrectPassword) {
      res.status(400).send({ error: "Senha incorreta" });
      return;
    }
    delete user.password;
    res.send({ user, token: generateToken(user.user_id) });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var forgotPassword = async (req, res) => {
  const { email, url } = req.body;
  try {
    const user = await existUser(email);
    if (!user) {
      res.status(400).send({ error: "Usu\xE1rio n\xE3o encontrado" });
      return;
    }
    const token = import_crypto.default.randomBytes(20).toString("hex");
    const tokenExpires = Date.now() + 1e3 * 60 * 30;
    const message = {
      from: {
        name: "CEAC",
        address: process.env.MAIL_FROM
      },
      to: user.email,
      subject: "Recupera\xE7\xE3o de senha",
      html: `
        <h1>Recupera\xE7\xE3o de senha</h1>
        <p>Clique no link abaixo para recuperar sua senha</p>
        <a href="${url}?token=${token}&user_id=${user.user_id}">Recuperar senha</a>
      `
    };
    await database("password_resets").insert({
      user_id: user.user_id,
      token,
      token_expires: new Date(tokenExpires)
    });
    const transporter = import_nodemailer.default.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
    transporter.sendMail(message, (err) => {
      if (err) {
        res.status(500).send({ error: "Erro ao enviar email" });
        return;
      }
      res.send({ message: "Email enviado" });
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var resetPassword = async (req, res) => {
  const { user_id, token, password } = req.body;
  try {
    const user = await existUser(user_id);
    if (!user) {
      res.status(400).send({ error: "Usu\xE1rio n\xE3o encontrado" });
      return;
    }
    const passwordChangeRequest = await database("password_resets").select("*").where({ token }).first();
    if (!passwordChangeRequest || passwordChangeRequest.token !== token) {
      res.status(401).send({ error: "Token Inv\xE1lido" });
      return;
    }
    if (passwordChangeRequest.token_expires < /* @__PURE__ */ new Date()) {
      res.status(401).send({ error: "Token expirado" });
      return;
    }
    const passwordHash = await import_bcryptjs.default.hash(password, 10);
    await database.transaction(async (db) => {
      await db("users").where({ user_id }).update({ password: passwordHash });
      await db("password_resets").where({ token }).del();
    });
    delete user.password;
    res.send({ user, token: generateToken(user.user_id) });
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};
var getAuthenticatedUser = async (req, res) => {
  try {
    const user = await database("users").where("user_id", req.user_id).first();
    if (!user)
      return res.status(404).send({ error: "Usu\xE1rio n\xE3o encontrado" });
    delete user.password;
    res.send(user);
  } catch {
    res.status(500).send({ error: "Erro Interno no Servidor" });
  }
};

// src/middlewares/auth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ error: "token not provided" });
    return;
  }
  const scheme = "Bearer ";
  if (!authorization.startsWith(scheme)) {
    res.status(401).send({ error: "token malformatted" });
    return;
  }
  const token = authorization.replace(scheme, "");
  import_jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "token invalid" });
      return;
    }
    req.user_id = decoded.user_id;
    next();
  });
}

// src/routes/auth.ts
var router = (0, import_express.Router)();
router.post("/sign-in", validation(signInPostBody), signIn);
router.post("/forgot-password", validation(forgotPasswordPostBody), forgotPassword);
router.post("/reset-password", validation(resetPasswordPostBody), resetPassword);
router.get("/me", auth, getAuthenticatedUser);
var auth_default = router;
