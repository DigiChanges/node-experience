import "reflect-metadata";
import * as bodyParser from "body-parser";
import express from "express";
import {InversifyExpressServer} from "inversify-express-utils";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import throttle from "express-rate-limit";
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
import RefreshTokenMiddleware from "../Presentation/Middlewares/RefreshTokenMiddleware";
import StatusCode from "../Presentation/Shared/StatusCode";

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
        // TODO: Refactor this code
        const meta: any = {
            status: StatusCode.HTTP_TOO_MANY_REQUESTS.status,
            code: StatusCode.HTTP_TOO_MANY_REQUESTS.code,
            statusCode: StatusCode.HTTP_TOO_MANY_REQUESTS.statusCode,
            message: 'Exceed 1 request per second',
            errors: null
        };

        // Blocking when exceed more than 1 request per second
        const CreateThrottle = throttle({
                      windowMs: 2 * 1000, // 2 second
                      max: 1, // start blocking after 1 request
                      message: meta
        });

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
            app.use(CreateThrottle);
            app.use(AuthenticationMiddleware);
            app.use(RefreshTokenMiddleware);
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
}

export default App;
