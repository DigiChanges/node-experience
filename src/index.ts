import dotenv from 'dotenv';
dotenv.config();

import { EventHandler, IApp } from '@digichanges/shared-experience';

import DependencyInjector from './Shared/DI/DependencyInjector';
import { FACTORIES, REPOSITORIES } from './Shared/DI/Injects';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';

import { ICronService } from './Main/Infrastructure/Factories/CronService';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Helpers/Logger';
import closedApplication from './closed';
import SendMessageEvent from './Notification/Domain/Events/SendMessageEvent';
import EmailEvent from './Auth/Infrastructure/Events/EmailEvent';
import ICacheDataAccess from './Main/Infrastructure/Repositories/ICacheDataAccess';
import { IMessageBroker } from './Shared/Infrastructure/IMessageBroker';
import crons from './crons';

void (async() =>
{
    try
    {
        const config = MainConfig.getInstance().getConfig();

        // Init Application
        const appBootstrap = AppBootstrapFactory.create(config.app.default);

        const app: IApp = await appBootstrap({
            serverPort: config.app.serverPort,
            proxy: config.app.setAppProxy,
            env: config.env,
            dbConfigDefault: config.dbConfig.default
        });

        await app.listen();

        // Create DB connection
        const databaseFactory = DependencyInjector.inject<DatabaseFactory>(FACTORIES.IDatabaseFactory);
        const createConnection: ICreateConnection = databaseFactory.create();

        await createConnection.initConfig();
        await createConnection.create();
        // Create Cache connection
        let cache: ICacheDataAccess;

        if (config.cache.enable)
        {
            cache = DependencyInjector.inject<ICacheDataAccess>(REPOSITORIES.ICacheDataAccess);
            await cache.cleanAll();
        }

        // Set EventHandler and all events
        const eventHandler = EventHandler.getInstance();
        eventHandler.setEvent(new EmailEvent());
        eventHandler.setEvent(new SendMessageEvent());

        // Create Cron Service
        const cronService = DependencyInjector.inject<ICronService>('ICronService');
        cronService.setCrons(crons);
        cronService.startAll();

        // Message Broker
        const messageBroker = DependencyInjector.inject<IMessageBroker>('IMessageBroker');
        // await messageBroker.connect(config.messageBroker);

        // Close gracefully
        const server = await app.getServer();
        closedApplication({
            server,
            cache,
            eventHandler,
            createConnection,
            messageBroker
        });
    }
    catch (error)
    {
        Logger.info('Error while connecting to the database', error);
        throw error;
    }
})();
