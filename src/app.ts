//Vendors
import * as bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
//Constants
import { ApiEndpointsConstants } from './config/api-endpoints.constants';
import "./config/db";
//Routes
import { authRouter } from "./features/auth/auth.routes";
import { ProjectRouter } from "./features/projects/projectRoute";
import { errorHandler } from './features/shared/helpers/appError';
//Helpers


class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        this.catchErrors();
        // this.setRoutesProj();
    }

    private setMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
    }

    private setRoutes(): void {
        this.express.use('/api/auth', authRouter)
        this.express.use('/api/project', ProjectRouter)
    }

    private catchErrors(): void {
        errorHandler
    }
}

export default new App().express;