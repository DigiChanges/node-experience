import cors from 'koa-cors';
import helmet from 'koa-helmet';
import hbshbs from 'koa-hbs';
import pino from 'koa-pino-logger';
import Config from 'config';

import AuthenticationMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/AuthenticationMiddleware';
import { loggerCli, loggerFile } from '../../../../Shared/Logger';
import RedirectRouteNotFoundMiddleware from '../../Middlewares/Koa/RedirectRouteNotFoundMiddleware';
import Throttle from '../../Middlewares/Koa/Throttle';
import VerifyTokenMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/VerifyTokenMiddleware';
import IApp from '../../../InterfaceAdapters/IApp';
import Locales from '../Locales';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexHandler from '../../Handlers/Koa/IndexHandler';
import ItemHandler from '../../../../Item/Presentation/Handlers/Koa/ItemHandler';
import Responder from './Responder';
import ErrorHttpException from '../ErrorHttpException';
import { ErrorExceptionMapper } from '../ErrorExceptionMapper';
import RoleHandler from '../../../../Role/Presentation/Handlers/Koa/RoleHandler';
import UserHandler from '../../../../User/Presentation/Handlers/Koa/UserHandler';
import NotificationHandler from '../../../../Notification/Presentation/Handlers/Koa/NotificationHandler';
import FileHandler from '../../../../File/Presentation/Handlers/Koa/FileHandler';
import AuthHandler from '../../../../Auth/Presentation/Handlers/Koa/AuthHandler';


class AppKoa implements IApp
{
    public port?: number;
    private readonly app: Koa;
    private locales: Locales;

    constructor()
    {
        this.port = (Config.get('serverPort') || 8090);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.app = require('koa-qs')(new Koa());
        this.locales = Locales.getInstance();
    }

    public initConfig()
    {
        this.app.use(cors());
        this.app.use(helmet());
        const view_route = `${Config.get('nodePath')}/dist/src/App/Presentation/Views`;
        this.app.use(hbshbs.middleware({
            viewPath: view_route
        }));

        // Generic error handling middleware.
        this.app.use(async(ctx: Koa.Context, next: () => Promise<any>) =>
        {
            try
            {
                await next();
            }
            catch (error)
            {
                const responder = new Responder();
                const exception: ErrorHttpException = ErrorExceptionMapper.handle(error);

                responder.error(exception, ctx, exception.statusCode);
                ctx.app.emit('error', error, ctx);
            }
        });

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));

        this.app.use(pino({
            prettyPrint: { colorize: true }
        }));
        this.app.use(Throttle);
        this.app.use(AuthenticationMiddleware);
        this.app.use(VerifyTokenMiddleware);

        // Application error logging
        // eslint-disable-next-line no-console
        this.app.on('error', console.error);
    }

    public build()
    {
        // Route middleware.
        this.app.use(IndexHandler.routes());
        this.app.use(IndexHandler.allowedMethods());

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

        return this.app;
    }

    public listen()
    {
        this.app.use(RedirectRouteNotFoundMiddleware);

        const server = this.app.listen(this.port, () =>
        {
            loggerCli.debug(`Koa is listening to http://localhost:${this.port}`);
        });
    }
}

export default AppKoa;
