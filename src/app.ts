import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import exphbs from 'express-handlebars';
import Config from 'config';
import i18n from 'i18n';

import './App/Presentation/Handlers/IndexHandler';
import './Item/Presentation/Handlers/ItemHandler';
import './User/Presentation/Handlers/UserHandler';
import './Auth/Presentation/Handlers/AuthHandler';
import './Role/Presentation/Handlers/RoleHandler';
import './File/Presentation/Handlers/FileHandler';
import './App/Presentation/Handlers/NotificationHandler';
import './App/Presentation/Handlers/LogHandler';

import LoggerWinston from './App/Presentation/Middlewares/LoggerWinston';
import AuthenticationMiddleware from './Auth/Presentation/Middlewares/AuthenticationMiddleware';
import {ErrorHandler} from './App/Presentation/Shared/ErrorHandler';
import {loggerCli} from './App/Infrastructure/Shared/Logger';
import RedirectRouteNotFoundMiddleware from './App/Presentation/Middlewares/RedirectRouteNotFoundMiddleware';
import Throttle from './App/Presentation/Middlewares/Throttle';
import VerifyTokenMiddleware from './App/Presentation/Middlewares/VerifyTokenMiddleware';
import container from './inversify.config';

export const Locales = i18n;

class App
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

export default App;
