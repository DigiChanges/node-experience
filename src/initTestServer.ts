import 'reflect-metadata';
import './inversify.config';
import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import { FACTORIES, REPOSITORIES } from './Config/Injects';
import TokenMongooseRepository from './Auth/Infrastructure/Repositories/TokenMongooseRepository';
import TokenTypeORMRepository from './Auth/Infrastructure/Repositories/TokenTypeORMRepository';
import { validateEnv } from './Config/validateEnv';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Presentation/Shared/Locales';
import MainConfig from './Config/MainConfig';
import IApp from './Shared/Application/Http/IApp';
import { Lifecycle } from 'tsyringe';
import MockStrategy from './Notification/Tests/MockStrategy';
import INotifierStrategy from './Notification/Shared/INotifierStrategy';
import AppFactory from './Shared/Factories/AppFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';

const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const config = MainConfig.getInstance().getConfig();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    const eventHandler = EventHandler.getInstance();
    await eventHandler.setListeners();

    void Locales.getInstance();

    const defaultDb = config.dbConfig.default;

    container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass:
        defaultDb ? TokenMongooseRepository : TokenTypeORMRepository
    }, { lifecycle: Lifecycle.Singleton });

    container.register<INotifierStrategy>(FACTORIES.EmailStrategy, { useClass: MockStrategy }, { lifecycle: Lifecycle.Singleton });

    const app: IApp = AppFactory.create(config.app.default);

    app.initConfig({
        serverPort: 8088
    });
    await app.build();

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;

