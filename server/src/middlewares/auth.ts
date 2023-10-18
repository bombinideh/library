import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

type JWTDecoded = Pick<IUser, "user_id">;

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ error: "token not provieded" });
    return;
  }

  const scheme = "Bearer ";

  if (!authorization.startsWith(scheme)) {
    res.status(401).send({ error: "token malformatted" });
    return;
  }

  const token = authorization.replace(scheme, "");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "token invalid" });
      return;
    }

    req.user_id = (<JWTDecoded>decoded).user_id;
    next();
  });
}
