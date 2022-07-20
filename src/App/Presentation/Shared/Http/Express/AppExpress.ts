import express from 'express';
import * as http from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import exphbs from 'express-handlebars';

import '../../../Handlers/Express/IndexHandler';
import '../../../../../Item/Presentation/Handlers/Express/ItemHandler';
import '../../../../../User/Presentation/Handlers/Express/UserHandler';
import '../../../../../Auth/Presentation/Handlers/Express/AuthHandler';
import '../../../../../Role/Presentation/Handlers/Express/RoleHandler';
import '../../../../../File/Presentation/Handlers/Express/FileHandler';
import '../../../../../Notification/Presentation/Handlers/Express/NotificationHandler';
import '../../../../Tests/Express/WhiteListHandler';
import '../../../Handlers/Express/LogHandler';

import AuthenticationMiddleware from '../../../../../Auth/Presentation/Middlewares/Express/AuthenticationMiddleware';
import { ErrorHandler } from './ErrorHandler';
import RedirectRouteNotFoundMiddleware from '../../../Middlewares/Express/RedirectRouteNotFoundMiddleware';
import Throttle from '../../../Middlewares/Express/Throttle';
import VerifyTokenMiddleware from '../../../../../Auth/Presentation/Middlewares/Express/VerifyTokenMiddleware';
import container from '../../../../../inversify.config';
import IApp from '../../../../InterfaceAdapters/IApp';
import IAppConfig from '../../../../InterfaceAdapters/IAppConfig';
import Logger from '../../../../../Shared/Logger/Logger';
import MainConfig from '../../../../../Config/mainConfig';
import { RequestContext } from '@mikro-orm/core';
import { orm } from '../../../../../Shared/Database/MikroORMCreateConnection';
import LoggerMiddleware from '../../../Middlewares/Express/LoggerMiddleware';

class AppExpress implements IApp
{
    public port?: number;
    private server: InversifyExpressServer;
    private app: express.Application;
    private serverExpress: http.Server;
    private config: IAppConfig;

    constructor(config: IAppConfig)
    {
        this.port = config.serverPort || 8090; // default port to listen;
        this.server = new InversifyExpressServer(container);
        this.config = config;
    }

    public initConfig()
    {
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

            app.set('views', this.config.viewRouteEngine);
            app.engine('.hbs', exphbs({
                defaultLayout: 'main',
                extname: '.hbs',
                layoutsDir: `${this.config.viewRouteEngine}/Layouts`,
                partialsDir: `${this.config.viewRouteEngine}/Partials`
            }));
            app.set('view engine', '.hbs');

            if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
            {
                app.use((req, res, next) =>
                {
                    RequestContext.create(orm.em, next);
                });
            }

            app.use(LoggerMiddleware);
            app.use('/api/', Throttle);
            app.use(AuthenticationMiddleware);
            app.use(VerifyTokenMiddleware);
        });

        this.server.setErrorConfig((app: express.Application) =>
        {
            app.use(ErrorHandler.handle);
        });
    }

    public build(): void
    {
        this.app = this.server.build();
        this.app.use(RedirectRouteNotFoundMiddleware);
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
