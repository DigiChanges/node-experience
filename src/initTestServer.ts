import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });

import { EventHandler, IApp } from '@digichanges/shared-experience';

import container from './Shared/DI/container';

import supertest from 'supertest';

import { MainConfig } from './Config/MainConfig';
import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';
import SeedFactory from './Shared/Factories/SeedFactory';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import IAuthRepository from './Auth/Domain/Repositories/IAuthRepository';
import { REPOSITORIES } from './Shared/DI/Injects';
import { Lifecycle } from 'tsyringe';
import SendMessageEvent from './Notification/Domain/Events/SendMessageEvent';
import AuthMockRepository from './Auth/Tests/AuthMockRepository';
import DependencyInjector from './Shared/DI/DependencyInjector';
import { IEventHandler } from './Notification/Infrastructure/events';

type TestServerData = {
    request: supertest.SuperAgentTest,
    dbConnection: ICreateConnection
}

const initTestServer = async(): Promise<TestServerData> =>
{
    const config = MainConfig.getEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    await dbConnection.initConfigTest();
    await dbConnection.create();
    await dbConnection.synchronize();

    const eventHandler = DependencyInjector.inject<IEventHandler>('IEventHandler');
    eventHandler.setEvent(new SendMessageEvent());

    // @ts-ignore
    container._registry._registryMap.delete('IAuthRepository');
    container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthMockRepository }, { lifecycle: Lifecycle.Singleton });

    const appBootstrap = AppBootstrapFactory.create(config.APP_DEFAULT);

    const app: IApp = await appBootstrap({
        serverPort: 8088,
        proxy: false,
        env: 'test',
        cors: config.APP_CORS
    });

    const application = await app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    await request.set({ Origin: config.URL_WEB, Accept: 'application/json' });

    return { request, dbConnection };
};

export default initTestServer;
