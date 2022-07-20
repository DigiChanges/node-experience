import cors from 'koa-cors';
import helmet from 'koa-helmet';
import hbshbs from 'koa-hbs';
import { Server } from 'http';

import AuthenticationMiddleware from '../../../../../Auth/Presentation/Middlewares/Koa/AuthenticationMiddleware';
import RedirectRouteNotFoundMiddleware from '../../../Middlewares/Koa/RedirectRouteNotFoundMiddleware';
import Throttle from '../../../Middlewares/Koa/Throttle';
import VerifyTokenMiddleware from '../../../../../Auth/Presentation/Middlewares/Koa/VerifyTokenMiddleware';
import IApp from '../../../../InterfaceAdapters/IApp';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexHandler from '../../../Handlers/Koa/IndexHandler';
import ItemHandler from '../../../../../Item/Presentation/Handlers/Koa/ItemHandler';
import RoleHandler from '../../../../../Role/Presentation/Handlers/Koa/RoleHandler';
import UserHandler from '../../../../../User/Presentation/Handlers/Koa/UserHandler';
import NotificationHandler from '../../../../../Notification/Presentation/Handlers/Koa/NotificationHandler';
import FileHandler from '../../../../../File/Presentation/Handlers/Koa/FileHandler';
import AuthHandler from '../../../../../Auth/Presentation/Handlers/Koa/AuthHandler';
import IAppConfig from '../../../../InterfaceAdapters/IAppConfig';
import WhiteListHandler from '../../../../Tests/Koa/WhiteListHandler';
import { ErrorHandler } from './ErrorHandler';
import MainConfig from '../../../../../Config/mainConfig';
import { RequestContext } from '@mikro-orm/core';
import { orm } from '../../../../../Shared/Database/MikroORMCreateConnection';
import LoggerMiddleware from '../../../Middlewares/Koa/LoggerMiddleware';
import Logger from '../../../../../Shared/Logger/Logger';

class AppKoa implements IApp
{
    public port?: number;
    private readonly app: Koa;
    private config: IAppConfig;
    private server: Server;

    constructor(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.app = require('koa-qs')(new Koa());
        this.config = config;
    }

    public initConfig()
    {
        this.app.use(cors({
            credentials: true
        }));
        this.app.proxy = MainConfig.getInstance().getConfig().env === 'production';
        this.app.use(helmet());
        this.app.use(hbshbs.middleware({
            viewPath: this.config.viewRouteEngine
        }));

        // Generic error handling middleware.
        this.app.use(ErrorHandler.handle);

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));

        if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
        {
            this.app.use((ctx, next) => RequestContext.createAsync(orm.em, next));
        }

        this.app.use(LoggerMiddleware);
        this.app.use(Throttle);
        this.app.use(AuthenticationMiddleware);
        this.app.use(VerifyTokenMiddleware);
    }

    public build(): void
    {
        // Route middleware.
        this.app.use(IndexHandler.routes());
        this.app.use(IndexHandler.allowedMethods());

        this.app.use(WhiteListHandler.routes());
        this.app.use(WhiteListHandler.allowedMethods());

        this.app.use(ItemHandler.routes());
        this.app.use(ItemHandler.allowedMethods());

        this.app.use(RoleHandler.routes());
        this.app.use(RoleHandler.allowedMethods());

        this.app.use(UserHandler.routes());
        this.app.use(UserHandler.allowedMethods());

        this.app.use(NotificationHandler.routes());
        this.app.use(NotificationHandler.allowedMethods());

        this.app.use(FileHandler.routes());
        this.app.use(FileHandler.allowedMethods());

        this.app.use(AuthHandler.routes());
        this.app.use(AuthHandler.allowedMethods());

        this.app.use(RedirectRouteNotFoundMiddleware);
    }

    public listen(): any
    {
        this.server = this.app.listen(this.port, () =>
        {
            Logger.info(`Koa is listening to http://localhost:${this.port}`);
        });

        return this.server;
    }

    public callback(): any
    {
        return this.app.callback();
    }

    close(): void
    {
        if (this.server)
        {
            this.server.close();
        }
    }
}

export default AppKoa;
