import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import {InversifyExpressServer} from 'inversify-express-utils';
import supertest from 'supertest';

import './App/Presentation/Handlers/IndexHandler';
import './Auth/Presentation/Handlers/AuthHandler';
import './Item/Presentation/Handlers/ItemHandler';
import './User/Presentation/Handlers/UserHandler';
import './Role/Presentation/Handlers/RoleHandler';
// import "../Presentation/Handlers/FileHandler";
// import "../Presentation/Handlers/NotificationHandler";

import {Locales} from './app';

import {ICreateConnection, ITokenRepository} from '@digichanges/shared-experience';

import LoggerWinston from './App/Presentation/Middlewares/LoggerWinston';
import AuthenticationMiddleware from './Auth/Presentation/Middlewares/AuthenticationMiddleware';
import RefreshTokenMiddleware from './App/Presentation/Middlewares/RefreshTokenMiddleware';

import {ErrorHandler} from './App/Presentation/Shared/ErrorHandler';
import DatabaseFactory from './App/Infrastructure/Factories/DatabaseFactory';
import SeedFactory from './App/Infrastructure/Seeds/SeedFactory';
import EventHandler from './App/Infrastructure/Events/EventHandler';
import RedirectRouteNotFoundMiddleware from './App/Presentation/Middlewares/RedirectRouteNotFoundMiddleware';
import {REPOSITORIES} from './repositories';
import TokenMongoRepository from './Auth/Infrastructure/Repositories/TokenMongoRepository';
import {validateEnv} from './Config/validateEnv';
import container from './inversify.config';
import ITokenDomain from './App/InterfaceAdapters/ITokenDomain';

const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    container.unbind(REPOSITORIES.ITokenRepository);
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenMongoRepository);

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

export default initTestServer;