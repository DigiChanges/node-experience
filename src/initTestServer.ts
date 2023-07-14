import { IApp } from '@digichanges/shared-experience';

import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';
import { EventHandler } from '@digichanges/shared-experience';
import { validateEnv } from './Config/validateEnv';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Utils/Locales';
import MainConfig from './Config/MainConfig';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import IAuthRepository from './Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import IAuthzRepository from './Auth/Infrastructure/Repositories/Auth/IAuthzRepository';
import IUserRepository from './Auth/Infrastructure/Repositories/User/IUserRepository';
import IRoleRepository from './Auth/Infrastructure/Repositories/Role/IRoleRepository';
import { REPOSITORIES } from './Config/Injects';
import AuthMockRepository from './Auth/Tests/AuthMockRepository';
import AuthzMockRepository from './Auth/Tests/AuthzMockRepository';
import UserMockRepository from './Auth/Tests/UserMockRepository';
import RoleMockRepository from './Auth/Tests/RoleMockRepository';
import { Lifecycle } from 'tsyringe';
import UserCreatedEvent from './Auth/Infrastructure/Events/UserCreatedEvent';
import SendMessageEvent from './Notification/Infrastructure/Events/SendMessageEvent';
import EmailEvent from './Auth/Infrastructure/Events/EmailEvent';

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
    eventHandler.setEvent(new UserCreatedEvent());
    eventHandler.setEvent(new EmailEvent());
    eventHandler.setEvent(new SendMessageEvent());

    void Locales.getInstance();

    // @ts-ignore
    container._registry._registryMap.delete('IAuthRepository');
    // @ts-ignore
    container._registry._registryMap.delete('IAuthzRepository');
    // @ts-ignore
    container._registry._registryMap.delete('IAuthzRepository');
    // @ts-ignore
    container._registry._registryMap.delete('IUserRepository');
    // @ts-ignore
    container._registry._registryMap.delete('IRoleRepository');

    container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthMockRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IAuthzRepository>(REPOSITORIES.IAuthzRepository, { useClass: AuthzMockRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMockRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMockRepository }, { lifecycle: Lifecycle.ContainerScoped });

    const appBootstrap = AppBootstrapFactory.create(config.app.default);

    const app: IApp = await appBootstrap({
        serverPort: 8088,
        proxy: false
    });

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;
