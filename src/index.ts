import dotenv from 'dotenv';
dotenv.config();

import { EventHandler, IApp } from '@digichanges/shared-experience';

import container from './Shared/DI/container';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';

import CronFactory from './Main/Infrastructure/Factories/CronFactory';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Helpers/Logger';
import closedApplication from './closed';
import SendMessageEvent from './Notification/Infrastructure/Events/SendMessageEvent';
import EmailEvent from './Auth/Infrastructure/Events/EmailEvent';
import ICacheDataAccess from './Main/Infrastructure/Repositories/ICacheDataAccess';
import { REPOSITORIES } from './Config/Injects';

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
        const databaseFactory = new DatabaseFactory();
        const createConnection: ICreateConnection = databaseFactory.create();
        await createConnection.initConfig();
        await createConnection.create();

        // Create Cache connection
        const cache: ICacheDataAccess = container.resolve(REPOSITORIES.ICacheDataAccess);
        await cache.cleanAll();

        // Set EventHandler and all events
        const eventHandler = EventHandler.getInstance();
        eventHandler.setEvent(new EmailEvent());
        eventHandler.setEvent(new SendMessageEvent());

        // Create cron
        const cronFactory = new CronFactory();
        cronFactory.start();

        // Close gracefully
        const server = await app.getServer();
        closedApplication(server, cache, createConnection, eventHandler);
    }
    catch (error)
    {
        Logger.info('Error while connecting to the database', error);
        throw error;
    }
})();
