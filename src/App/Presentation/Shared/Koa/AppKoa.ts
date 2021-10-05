import cors from 'koa-cors';
import helmet from 'koa-helmet';
import hbshbs from 'koa-hbs';
import Config from 'config';

import LoggerWinston from '../../Middlewares/Express/LoggerWinston';
import AuthenticationMiddleware from '../../../../Auth/Presentation/Middlewares/AuthenticationMiddleware';
import { loggerCli, loggerFile } from '../../../../Shared/Logger';
import RedirectRouteNotFoundMiddleware from '../../Middlewares/Koa/RedirectRouteNotFoundMiddleware';
import Throttle from '../../Middlewares/Koa/Throttle';
import VerifyTokenMiddleware from '../../../../Auth/Presentation/Middlewares/VerifyTokenMiddleware';
import IApp from '../../../InterfaceAdapters/IApp';
import Locales from '../Locales';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexHandler from '../../Handlers/Koa/IndexHandler';
import ItemHandler from '../../../../Item/Presentation/Handlers/Koa/ItemHandler';
import Responder from './Responder';
import ErrorHttpException from '../ErrorHttpException';
import { ErrorExceptionMapper } from '../ErrorExceptionMapper';
import { StatusCode } from '@digichanges/shared-experience';
import moment from 'moment';


class AppKoa implements IApp
{
    public port?: number;
    private app: Koa;
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
        const viewRoute = `${Config.get('nodePath')}/dist/src/App/Presentation/Views`;

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

                if (exception.statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code)
                {
                    const meta = {
                        code: StatusCode.HTTP_INTERNAL_SERVER_ERROR.code,
                        method: ctx.method,
                        path: ctx.path,
                        payload: ctx.body,
                        date: moment().toISOString()
                    };

                    loggerFile.error(error.stack, meta);
                }

                loggerCli.debug(error.stack);

                responder.error(exception, ctx, exception.statusCode);
                ctx.app.emit('error', error, ctx);
            }
        });

        this.app.use(bodyParser());
        this.app.use(Throttle);
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
