import './register';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';

import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import CacheFactory from './Main/Infrastructure/Factories/CacheFactory';
import ICacheRepository from './Shared/Infrastructure/Repositories/ICacheRepository';

import CronFactory from './Main/Infrastructure/Factories/CronFactory';
import IApp from './Shared/Application/IApp';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Helpers/Logger/Logger';
import closedApplication from './closed';
import UserCreatedEvent from './Auth/Infrastructure/Events/UserCreatedEvent';
import SendMessageEvent from './Notification/Infrastructure/Events/SendMessageEvent';
import EmailEvent from './Auth/Infrastructure/Events/EmailEvent';

void (async() =>
{
    try
    {
        const config = MainConfig.getInstance().getConfig();

        // Init Application
        const appBootstrap = AppBootstrapFactory.create(config.app.default);
        const app: IApp = await appBootstrap({
            serverPort: config.app.serverPort,
            proxy: config.app.setAppProxy
        });

        const server = app.listen(() =>
        {
            void Logger.info(`Koa is listening to http://localhost:${config.app.serverPort}`);
        });

        // Create DB connection
        const databaseFactory = new DatabaseFactory();
        const createConnection: ICreateConnection = databaseFactory.create();
        await createConnection.initConfig();
        await createConnection.create();

        // Create Cache connection
        const cache: ICacheRepository = CacheFactory.createRedisCache(config.cache.redis);
        await cache.cleanAll();

        // Set EventHandler and all events
        const eventHandler = EventHandler.getInstance();
        eventHandler.setEvent(new UserCreatedEvent());
        eventHandler.setEvent(new EmailEvent());
        eventHandler.setEvent(new SendMessageEvent());

        // Create cron
        const cronFactory = new CronFactory();
        cronFactory.start();

        // Close gracefully
        closedApplication(server, cache, createConnection, eventHandler);
    }
    catch (error)
    {
        await Logger.info('Error while connecting to the database', error);
        throw error;
    }
})();
