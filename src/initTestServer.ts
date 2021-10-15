import 'reflect-metadata';

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';

import './App/Presentation/Handlers/Express/IndexHandler';
import './Auth/Presentation/Handlers/Express/AuthHandler';
import './User/Presentation/Handlers/Express/UserHandler';
import './Role/Presentation/Handlers/Express/RoleHandler';
import './File/Presentation/Handlers/Express/FileHandler';
import './Item/Presentation/Handlers/Express/ItemHandler';
import './App/Tests/WhiteListHandler';
// import "../Presentation/Handlers/NotificationHandler";

import { ICreateConnection, ITokenRepository } from '@digichanges/shared-experience';

import LoggerWinston from './App/Presentation/Middlewares/Express/LoggerWinston';
import AuthenticationMiddleware from './Auth/Presentation/Middlewares/Express/AuthenticationMiddleware';
import RefreshTokenMiddleware from './Auth/Presentation/Middlewares/Express/RefreshTokenMiddleware';

import { ErrorHandler } from './App/Presentation/Shared/Express/ErrorHandler';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Events/EventHandler';
import RedirectRouteNotFoundMiddleware from './App/Presentation/Middlewares/Express/RedirectRouteNotFoundMiddleware';
import { REPOSITORIES } from './Config/repositories';
import TokenMongoRepository from './Auth/Infrastructure/Repositories/TokenMongoRepository';
import { validateEnv } from './Config/validateEnv';
import container from './inversify.config';
import ITokenDomain from './Auth/InterfaceAdapters/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './App/Presentation/Shared/Locales';


const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    container.unbind(REPOSITORIES.ITokenRepository);
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenMongoRepository);

    void Locales.getInstance();

    const server = new InversifyExpressServer(container);

    server.setConfig((app: express.Application) =>
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
        app.use(LoggerWinston);
        app.use(AuthenticationMiddleware);
        app.use(RefreshTokenMiddleware);
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

    EventHandler.getInstance();

    return { request, dbConnection };
};

export default initTestServer;
