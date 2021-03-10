//Vendors
import { Request, Response } from "express";
//Services
import * as authService from "./auth.service";
import { iUserLogin } from "./auth.service";
import { errorHandler } from "../shared/helpers/appError";

export function authHandler(req: Request, res: Response) {
  authService
    .authCreate(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}

export function loginUser(req: Request, res: Response) {
  iUserLogin(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => errorHandler(err, res));
}
