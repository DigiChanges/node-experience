import { IApp, AppKoa, IAppConfig } from '@digichanges/shared-experience';

import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';

import ThrottleKoaMiddleware from '../Middleware/ThrottleKoaMiddleware';
import bodyParser from 'koa-bodyparser';
import IndexKoaRouter from '../Routers/IndexKoaRouter';
import ItemKoaRouter from '../../../Item/Presentation/Routes/ItemKoaRouter';
import RoleKoaRouter from '../../../Auth/Presentation/Routers/RoleKoaRouter';
import UserKoaRouter from '../../../Auth/Presentation/Routers/UserKoaRouter';
import NotificationKoaHandler from '../../../Notification/Presentation/Handlers/NotificationKoaHandler';
import FileKoaRouter from '../../../File/Presentation/Routes/FileKoaRouter';
import AuthKoaRouter from '../../../Auth/Presentation/Routers/AuthKoaRouter';
import { ErrorKoaHandler } from '../Middleware/ErrorKoaHandler';
import MainConfig from '../../../Config/MainConfig';

import LoggerKoaMiddleware from '../Middleware/LoggerKoaMiddleware';
import ContextMikroORMKoaMiddleware from '../Middleware/ContextMikroORMKoaMiddleware';
import ContainerKoaMiddleware from '../Middleware/ContainerKoaMiddleware';
import RedirectRouteNotFoundKoaMiddleware from '../Middleware/RedirectRouteNotFoundKoaMiddleware';
import GetRequestContextKoaMiddleware from '../Middleware/GetRequestContextKoaMiddleware';

const KoaBootstrapping = async(config: IAppConfig) =>
{
    const app: IApp = new AppKoa(config);
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
    app.addMiddleware<Koa.Middleware>(compress());

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
