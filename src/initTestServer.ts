import 'reflect-metadata';
import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import { validateEnv } from './Config/validateEnv';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Presentation/Shared/Locales';
import MainConfig from './Config/MainConfig';
import IApp from './Shared/Application/Http/IApp';
import AppFactory from './Shared/Factories/AppFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';

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

    // @ts-ignore
    container._registry._registryMap.delete('IAuthRepository');

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
