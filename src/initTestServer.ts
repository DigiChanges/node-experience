import 'reflect-metadata';

import supertest from 'supertest';

import './App/Presentation/Handlers/Express/IndexHandler';
import './Auth/Presentation/Handlers/Express/AuthHandler';
import './User/Presentation/Handlers/Express/UserHandler';
import './Role/Presentation/Handlers/Express/RoleHandler';
import './File/Presentation/Handlers/Express/FileHandler';
import './Item/Presentation/Handlers/Express/ItemHandler';
import './App/Tests/Express/WhiteListHandler';
// import "../Presentation/Handlers/NotificationHandler";

import { ICreateConnection, ITokenRepository } from '@digichanges/shared-experience';

import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Events/EventHandler';
import RedirectRouteNotFoundMiddleware from './App/Presentation/Middlewares/Express/RedirectRouteNotFoundMiddleware';
import { REPOSITORIES } from './Config/repositories';
import TokenMongoRepository from './Auth/Infrastructure/Repositories/TokenMongoRepository';
import { validateEnv } from './Config/validateEnv';
import container from './inversify.config';
import ITokenDomain from './Auth/InterfaceAdapters/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import AppFactory from './App/Presentation/Factories/AppFactory';
import Locales from './App/Presentation/Shared/Locales';

const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    const eventHandler = EventHandler.getInstance();
    await eventHandler.setListeners();

    void Locales.getInstance();

    container.unbind(REPOSITORIES.ITokenRepository);
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenMongoRepository);

    const app = AppFactory.create('AppKoa', {
        viewRouteEngine: `${process.cwd()}/dist/src/App/Presentation/Views`,
        localesDirectory: `${process.cwd()}/dist/src/Config/Locales`,
        serverPort: 8088
    });

    app.initConfig();
    app.build();

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;

