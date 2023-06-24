import AppKoa from './AppKoa';
import IApp from './IApp';

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';

import ThrottleKoaMiddleware from '../../Presentation/Middlewares/ThrottleKoaMiddleware';
import bodyParser from 'koa-bodyparser';
import IndexKoaRouter from '../../Presentation/Routers/IndexKoaRouter';
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
import ContextMikroORMKoaMiddleware from '../../Presentation/Middlewares/ContextMikroORMKoaMiddleware';
import ContainerKoaMiddleware from '../../Presentation/Middlewares/ContainerKoaMiddleware';
import RedirectRouteNotFoundKoaMiddleware from '../../Presentation/Middlewares/RedirectRouteNotFoundKoaMiddleware';
import GetRequestContextKoaMiddleware from '../../Presentation/Middlewares/GetRequestContextKoaMiddleware';

const KoaBootstrapping = async(config: IAppConfig) =>
{
    const app: IApp = new AppKoa();
    app.initConfig(config);
    app.addMiddleware<Koa.Middleware>(cors({
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
    app.addMiddleware<Koa.Middleware>(helmet());
    app.addMiddleware<Koa.Middleware>(bodyParser({
        jsonLimit: '5mb'
    }));

    // Generic error handling middleware.
    app.addMiddleware<Koa.Middleware>(ErrorKoaHandler.handle);

    if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
    {
        app.addMiddleware<Koa.Middleware>(ContextMikroORMKoaMiddleware);
    }

    app.addMiddleware<Koa.Middleware>(ContainerKoaMiddleware);
    app.addMiddleware<Koa.Middleware>(LoggerKoaMiddleware);
    app.addMiddleware<Koa.Middleware>(ThrottleKoaMiddleware);

    app.addRouter<Router>(IndexKoaRouter);
    app.addRouter<Router>(ItemKoaRouter);
    app.addRouter<Router>(RoleKoaRouter);
    app.addRouter<Router>(UserKoaRouter);
    app.addRouter<Router>(NotificationKoaHandler);
    app.addRouter<Router>(FileKoaRouter);
    app.addRouter<Router>(AuthKoaRouter);

    app.addMiddleware<Koa.Middleware>(GetRequestContextKoaMiddleware);
    app.addMiddleware<Koa.Middleware>(RedirectRouteNotFoundKoaMiddleware);

    return app;
};

export default KoaBootstrapping;
