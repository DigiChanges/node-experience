import 'reflect-metadata';
import '../Presentation/Handlers/IndexHandler';
import '../Presentation/Handlers/AuthHandler';
import '../Presentation/Handlers/ItemHandler';
import '../Presentation/Handlers/UserHandler';
import '../Presentation/Handlers/RoleHandler';
// import "../Presentation/Handlers/FileHandler";
// import "../Presentation/Handlers/NotificationHandler";

import {Locales} from '../Application/app';

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import {ICreateConnection, ITokenRepository} from '@digichanges/shared-experience';

import LoggerWinston from '../Presentation/Middlewares/LoggerWinston';
import AuthenticationMiddleware from '../Presentation/Middlewares/AuthenticationMiddleware';
import RefreshTokenMiddleware from '../Presentation/Middlewares/RefreshTokenMiddleware';

import {InversifyExpressServer} from 'inversify-express-utils';
import {ErrorHandler} from '../Presentation/Shared/ErrorHandler';
import supertest from 'supertest';
import DatabaseFactory from '../Infrastructure/Factories/DatabaseFactory';
import SeedFactory from '../Infrastructure/Seeds/SeedFactory';
import EventHandler from '../Infrastructure/Events/EventHandler';
import RedirectRouteNotFoundMiddleware from '../Presentation/Middlewares/RedirectRouteNotFoundMiddleware';
import {REPOSITORIES} from '../repositories';
import TokenMongoRepository from '../Infrastructure/Repositories/TokenMongoRepository';
import {validateEnv} from '../Config/validateEnv';
import container from '../inversify.config';

const initServer = async(): Promise<any> =>
{
    validateEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    container.unbind(REPOSITORIES.ITokenRepository);
    container.bind<ITokenRepository>(REPOSITORIES.ITokenRepository).to(TokenMongoRepository);

    Locales.configure({
        locales: ['en', 'es'],
        directory: `${process.cwd()}/dist/Config/Locales`,
        defaultLocale: 'en',
        objectNotation: true
    });

    const server = new InversifyExpressServer(container);

    server.setConfig((app: express.Application) =>
    {
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: '5mb'
        }));
        app.use(bodyParser.json({
            limit: '5mb'
        }));
        app.use(compression());
        app.use(cors());
        app.use(helmet());
        app.use(LoggerWinston);
        app.use(AuthenticationMiddleware);
        app.use(RefreshTokenMiddleware);
        app.use(Locales.init);
    });

    server.setErrorConfig((app: express.Application) =>
    {
        app.use(ErrorHandler.handle);
    });

    const application = server.build();
    application.use(RedirectRouteNotFoundMiddleware);
    const request: supertest.SuperTest<supertest.Test> = supertest(application);

    const seed = new SeedFactory();
    await seed.init();

    // TODO: Add filesystem mock
    // filesystem = FilesystemFactory.create();

    EventHandler.getInstance();

    return {request, dbConnection};
};

export default initServer;