import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });

import supertest from 'supertest';

import { MainConfig } from './Config/MainConfig';
import SeedFactory from './Shared/Factories/SeedFactory';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import SendMessageEvent from './Notification/Domain/Events/SendMessageEvent';
import DependencyInjector from './Shared/DI/DependencyInjector';
import { IApp } from './Main/Presentation/Application/IApp';
import { IEventHandler } from './Notification/Domain/Models/EventHandler';

type TestServerData = {
    request: supertest.SuperAgentTest,
    dbConnection: ICreateConnection
}

const initTestServer = async(): Promise<TestServerData> =>
{
    const config = MainConfig.getEnv();

    const dbConnection = DependencyInjector.inject<ICreateConnection>('ICreateConnection');

    await dbConnection.initConfigTest();
    await dbConnection.create();
    await dbConnection.synchronize();

    const eventHandler = DependencyInjector.inject<IEventHandler>('IEventHandler');
    eventHandler.setEvent(new SendMessageEvent());

    const appBootstrap = AppBootstrapFactory.create(config.APP_DEFAULT);

    const app: IApp = await appBootstrap({
        serverPort: config.APP_PORT,
        proxy: config.APP_SET_APP_PROXY,
        env: config.NODE_ENV,
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
