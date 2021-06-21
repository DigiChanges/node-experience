import 'reflect-metadata';
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import exphbs from 'express-handlebars';
import Config from 'config';
import i18n from 'i18n';

import '../../Handlers/Express/IndexHandler';
import '../../../../Item/Presentation/Handlers/Express/ItemHandler';
import '../../../../User/Presentation/Handlers/Express/UserHandler';
import '../../../../Auth/Presentation/Handlers/Express/AuthHandler';
import '../../../../Role/Presentation/Handlers/Express/RoleHandler';
import '../../../../File/Presentation/Handlers/Express/FileHandler';
import '../../../../Notification/Presentation/Handlers/Express/NotificationHandler';
import '../../Handlers/Express/LogHandler';

import LoggerWinston from '../../Middlewares/LoggerWinston';
import AuthenticationMiddleware from '../../../../Auth/Presentation/Middlewares/AuthenticationMiddleware';
import {ErrorHandler} from './ErrorHandler';
import {loggerCli} from '../../../../Shared/Logger';
import RedirectRouteNotFoundMiddleware from '../../Middlewares/RedirectRouteNotFoundMiddleware';
import Throttle from '../../Middlewares/Throttle';
import VerifyTokenMiddleware from '../../../../Auth/Presentation/Middlewares/VerifyTokenMiddleware';
import container from '../../../../inversify.config';
import IApp from '../../../InterfaceAcapters/IApp';

export const Locales = i18n;

class AppExpress implements IApp
{
    public port?: number;
    private server: InversifyExpressServer;
    private app: express.Application;

    constructor()
    {
        this.port = (Config.get('serverPort') || 8090); // default port to listen;
        this.server = new InversifyExpressServer(container);

        Locales.configure({
            locales: ['en', 'es'],
            directory: `${Config.get('nodePath')}/dist/src/Config/Locales`,
            defaultLocale: 'en',
            objectNotation: true
        });
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
            const viewRoute = `${Config.get('nodePath')}/dist/src/App/Presentation/Views`;
            app.set('views', viewRoute);
            app.engine('.hbs', exphbs({
                defaultLayout: 'main',
                extname: '.hbs',
                layoutsDir: `${viewRoute}/Layouts`,
                partialsDir: `${viewRoute}/Partials`
            }));
            app.set('view engine', '.hbs');
            app.use(LoggerWinston);
            app.use('/api/', Throttle);
            app.use(AuthenticationMiddleware);
            app.use(VerifyTokenMiddleware);
            app.use(Locales.init);
        });

        this.server.setErrorConfig((app: express.Application) =>
        {
            app.use(ErrorHandler.handle);
        });
    }

    public build()
    {
        this.app = this.server.build();
    }

    public listen()
    {
        this.app.use(RedirectRouteNotFoundMiddleware);

        this.app.listen(this.port, () =>
        {
            loggerCli.debug(`App listening on the port ${this.port}`);
        });
    }
}

export default AppExpress;
