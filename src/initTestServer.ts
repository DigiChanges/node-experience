import 'reflect-metadata';
import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import { REPOSITORIES } from './Config/Injects';
import TokenMongooseRepository from './Auth/Infrastructure/Repositories/TokenMongooseRepository';
import TokenTypeORMRepository from './Auth/Infrastructure/Repositories/TokenTypeORMRepository';
import { validateEnv } from './Config/validateEnv';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Presentation/Shared/Locales';
import MainConfig from './Config/MainConfig';
import IApp from './Shared/Application/Http/IApp';
import { Lifecycle } from 'tsyringe';
import AppFactory from './Shared/Factories/AppFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';

type TestServerData = {
    request: supertest.SuperAgentTest,
    dbConnection: ICreateConnection
}

const initTestServer = async(): Promise<TestServerData> =>
{
    validateEnv();

    const config = MainConfig.getInstance().getConfig();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    await dbConnection.initConfigTest();
    await dbConnection.create();
    await dbConnection.synchronize();

    const eventHandler = EventHandler.getInstance();
    await eventHandler.setListeners();

    void Locales.getInstance();

    const defaultDb = config.dbConfig.default;

    // @ts-ignore
    container._registry._registryMap.delete('ITokenRepository');

    container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass:
        defaultDb === 'Mongoose' ? TokenMongooseRepository : TokenTypeORMRepository
    }, { lifecycle: Lifecycle.Singleton });

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

