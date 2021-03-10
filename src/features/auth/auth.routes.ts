//Vendors
import { Router } from "express";
//Controllers
import * as authController from "./auth.controller";

export const authRouter: Router = Router();

authRouter.post('/register', authController.authHandler);
authRouter.post('/login', authController.loginUser);