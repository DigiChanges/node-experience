import "reflect-metadata";
import * as bodyParser from "body-parser";
import express from "express";
import {InversifyExpressServer} from "inversify-express-utils";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import Config from "config";

import Container from "../inversify.config";

import "../Presentation/Handlers/IndexHandler";
import "../Presentation/Handlers/ItemHandler";
import "../Presentation/Handlers/UserHandler";
import "../Presentation/Handlers/AuthHandler";
import "../Presentation/Handlers/RoleHandler";
import "../Presentation/Handlers/FileHandler";
import "../Presentation/Handlers/NotificationHandler";

import LoggerWinston from "../Presentation/Middlewares/LoggerWinston";
import AuthenticationMiddleware from "../Presentation/Middlewares/AuthenticationMiddleware";
import {ErrorHandler} from "../Presentation/Shared/ErrorHandler";
import {loggerCli} from "../Infrastructure/Shared/Logger";
import RedirectRouteNotFoundMiddleware from "../Presentation/Middlewares/RedirectRouteNotFoundMiddleware";

class App
{
    public port?: number;
    private server: InversifyExpressServer;
    private app: express.Application;

    constructor()
    {
        this.port = (Config.get('serverPort') || 8090); // default port to listen;
        this.server = new InversifyExpressServer(Container);
    }

    public async initConfig()
    {
        this.server.setConfig((app: any) =>
        {
            app.use(bodyParser.urlencoded({
                extended: true,
                limit: '5mb'
            }));
            app.use(bodyParser.json({
                 limit: '5mb'
            }));
            app.use(compression());
            app.use(cors());
            app.use(helmet());
            app.use(LoggerWinston);
            app.use(AuthenticationMiddleware);
        });

        this.server.setErrorConfig((app: any) =>
        {
            app.use(ErrorHandler.handle);
        });
    }

    public async build()
    {
        this.app = await this.server.build();
    }

    public async listen()
    {
        this.app.use(RedirectRouteNotFoundMiddleware);

        this.app.listen(this.port, () => {
            loggerCli.debug(`App listening on the port ${this.port}`);
        });
    }

    public getApp()
    {
        return this.app;
    }
}

export default App;
