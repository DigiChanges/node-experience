import express from 'express';
import * as http from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import container from '../../../inversify.config';
import newContainer from '../../../register';

import '../../Presentation/Handlers/IndexExpressHandler';
import '../../../Item/Presentation/Handlers/ItemExpressHandler';
import '../../../User/Presentation/Handlers/UserExpressHandler';
import '../../../Auth/Presentation/Handlers/AuthExpressHandler';
import '../../../Role/Presentation/Handlers/RoleExpressHandler';
import '../../../File/Presentation/Handlers/FileExpressHandler';
import '../../../Notification/Presentation/Handlers/NotificationExpressHandler';
import '../../Tests/WhiteListExpressHandler';

import AuthenticationExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthenticationExpressMiddleware';
import { ErrorExpressHandler } from './ErrorExpressHandler';
import RedirectRouteNotFoundExpressMiddleware from '../../Presentation/Middlewares/RedirectRouteNotFoundExpressMiddleware';
import ThrottleExpressMiddleware from '../../Presentation/Middlewares/ThrottleExpressMiddleware';
import VerifyTokenExpressMiddleware from '../../../Auth/Presentation/Middlewares/VerifyTokenExpressMiddleware';
import IApp from './IApp';
import IAppConfig from './IAppConfig';
import MainConfig from '../../../Config/MainConfig';

import LoggerExpressMiddleware from '../../Presentation/Middlewares/LoggerExpressMiddleware';
import { createRequestContext, getRequestContext } from '../../Presentation/Shared/RequestContext';
import Logger from '../Logger/Logger';
import ContextMikroORMExpressMiddleware from '../../Presentation/Middlewares/ContextMikroORMExpressMiddleware';
import ContainerExpressMiddleware from '../../Presentation/Middlewares/ContainerExpressMiddleware';

class AppExpress implements IApp
{
    public port?: number;
    private server: InversifyExpressServer;
    private app: express.Application;
    private serverExpress: http.Server;
    private config: IAppConfig;

    public initConfig(config: IAppConfig)
    {
        this.port = config.serverPort || 8090; // default port to listen;
        this.server = new InversifyExpressServer(container);
        this.config = config;

        this.server.setConfig((app: express.Application) =>
        {
            app.use(express.urlencoded({
                extended: true,
                limit: '5mb'
            }));
            app.use(express.json({
                limit: '5mb'
            }));
            app.use(compression());
            app.use(cors());
            app.use(helmet());

            if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
            {
                app.use(ContextMikroORMExpressMiddleware);
            }

            app.use(ContainerExpressMiddleware);
            app.use(LoggerExpressMiddleware);
            app.use('/api/', ThrottleExpressMiddleware);
            app.use(AuthenticationExpressMiddleware);
            app.use(VerifyTokenExpressMiddleware);
        });

        this.server.setErrorConfig((app: express.Application) =>
        {
            app.use(ErrorExpressHandler.handle);
        });
    }

    public async build(): Promise<void>
    {
        this.app = this.server.build();
        this.app.use(async(req: any, res, next) =>
        {
            const data = getRequestContext();
            await data.container.dispose();
            delete data.container;

            next();
        });
        this.app.use(RedirectRouteNotFoundExpressMiddleware);
    }

    public listen(execute = false): any
    {
        this.serverExpress = this.app.listen(this.port, () =>
        {
            Logger.debug(`App listening on the port ${this.port}`);
        });
    }

    public callback(): any
    {
        return this.app;
    }

    close(): void
    {
        if (this.serverExpress)
        {
            this.serverExpress.close();
        }
    }
}

export default AppExpress;
