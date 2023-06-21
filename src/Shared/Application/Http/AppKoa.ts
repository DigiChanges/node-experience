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
import ItemKoaRouter from '../../../Item/Presentation/Routes/ItemKoaRouter';
import RoleKoaRouter from '../../../Auth/Presentation/Routers/RoleKoaRouter';
import UserKoaRouter from '../../../Auth/Presentation/Routers/UserKoaRouter';
import NotificationKoaHandler from '../../../Notification/Presentation/Handlers/NotificationKoaHandler';
import FileKoaRouter from '../../../File/Presentation/Routes/FileKoaRouter';
import AuthKoaRouter from '../../../Auth/Presentation/Routers/AuthKoaRouter';
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
            credentials: true
        }));
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
        this.app.proxy = false;
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

        this.app.use(ItemKoaRouter.routes());
        this.app.use(ItemKoaRouter.allowedMethods());

        this.app.use(RoleKoaRouter.routes());
        this.app.use(RoleKoaRouter.allowedMethods());

        this.app.use(UserKoaRouter.routes());
        this.app.use(UserKoaRouter.allowedMethods());

        this.app.use(NotificationKoaHandler.routes());
        this.app.use(NotificationKoaHandler.allowedMethods());

        this.app.use(FileKoaRouter.routes());
        this.app.use(FileKoaRouter.allowedMethods());

        this.app.use(AuthKoaRouter.routes());
        this.app.use(AuthKoaRouter.allowedMethods());

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
