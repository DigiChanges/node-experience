import cors from '@koa/cors';
import koaQs from 'koa-qs';
import helmet from 'koa-helmet';
import { Server } from 'http';

import RedirectRouteNotFoundKoaMiddleware from '../../Presentation/Middlewares/RedirectRouteNotFoundKoaMiddleware';
import ThrottleKoaMiddleware from '../../Presentation/Middlewares/ThrottleKoaMiddleware';
import IApp from './IApp';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexKoaHandler from '../../Presentation/Handlers/IndexKoaHandler';
import ItemKoaHandler from '../../../Item/Presentation/Handlers/ItemKoaHandler';
import RoleKoaHandler from '../../../Auth/Presentation/Handlers/RoleKoaHandler';
import UserKoaHandler from '../../../Auth/Presentation/Handlers/UserKoaHandler';
import NotificationKoaHandler from '../../../Notification/Presentation/Handlers/NotificationKoaHandler';
import FileKoaHandler from '../../../File/Presentation/Handlers/FileKoaHandler';
import AuthKoaHandler from '../../../Auth/Presentation/Handlers/AuthKoaHandler';
import IAppConfig from './IAppConfig';
import { ErrorKoaHandler } from './ErrorKoaHandler';
import MainConfig from '../../../Config/MainConfig';

import LoggerKoaMiddleware from '../../Presentation/Middlewares/LoggerKoaMiddleware';
import { getRequestContext } from '../../Presentation/Shared/RequestContext';
import Logger from '../Logger/Logger';
import ContextMikroORMKoaMiddleware from '../../Presentation/Middlewares/ContextMikroORMKoaMiddleware';
import ContainerKoaMiddleware from '../../Presentation/Middlewares/ContainerKoaMiddleware';

class AppKoa implements IApp
{
    public port?: number;
    private app: Koa;
    private config: IAppConfig;
    private server: Server;

    public initConfig(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        this.app = koaQs(new Koa());
        this.config = config;

        this.app.use(cors({
            credentials: true,
            origin: (ctx) =>
            {
                const { env } = MainConfig.getInstance().getConfig();
                const validDomains = env === 'development' ? ['http://localhost:5173'] : ['https://domain.com'];

                if (validDomains.indexOf(ctx.request.header.origin) !== -1)
                {
                    return ctx.request.header.origin;
                }

                return validDomains[0]; // we can't return void, so let's return one of the valid domains
            }
        }));
        this.app.proxy = MainConfig.getInstance().getConfig().app.setAppProxy;
        this.app.use(helmet());

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));

        // Generic error handling middleware.
        this.app.use(ErrorKoaHandler.handle);

        if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
        {
            this.app.use(ContextMikroORMKoaMiddleware);
        }

        this.app.use(ContainerKoaMiddleware);
        this.app.use(LoggerKoaMiddleware);
        this.app.use(ThrottleKoaMiddleware);
    }

    public async build(): Promise<void>
    {
        // Route middleware.
        this.app.use(IndexKoaHandler.routes());
        this.app.use(IndexKoaHandler.allowedMethods());

        this.app.use(ItemKoaHandler.routes());
        this.app.use(ItemKoaHandler.allowedMethods());

        this.app.use(RoleKoaHandler.routes());
        this.app.use(RoleKoaHandler.allowedMethods());

        this.app.use(UserKoaHandler.routes());
        this.app.use(UserKoaHandler.allowedMethods());

        this.app.use(NotificationKoaHandler.routes());
        this.app.use(NotificationKoaHandler.allowedMethods());

        this.app.use(FileKoaHandler.routes());
        this.app.use(FileKoaHandler.allowedMethods());

        this.app.use(AuthKoaHandler.routes());
        this.app.use(AuthKoaHandler.allowedMethods());

        this.app.use(async(ctx, next) =>
        {
            const data = getRequestContext();
            await data.container?.dispose();
            delete data.container;

            await next();
        });

        this.app.use(RedirectRouteNotFoundKoaMiddleware);
    }

    public listen(): Server
    {
        this.server = this.app.listen(this.port, () =>
        {
            void Logger.info(`Koa is listening to http://localhost:${this.port}`);
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
