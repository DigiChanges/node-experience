import './register';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import ICacheRepository from './Shared/Infrastructure/Repositories/ICacheRepository';

import CronFactory from './Shared/Factories/CronFactory';
import IApp from './Shared/Application/Http/IApp';
import AppBootstrapFactory from './Shared/Factories/AppBootstrapFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Application/Logger/Logger';
import closedApplication from './closed';

void (async() =>
{
    const config = MainConfig.getInstance().getConfig();
    const appBootstrap = AppBootstrapFactory.create(config.app.default);

    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();

    const cache: ICacheRepository = CacheFactory.createRedisCache(config.cache.redis);
    const eventHandler = EventHandler.getInstance();

    const app: IApp = await appBootstrap({
        serverPort: config.app.serverPort,
        proxy: config.app.setAppProxy
    });

    const server = app.listen(() =>
    {
        void Logger.info(`Koa is listening to http://localhost:${config.app.serverPort}`);
    });

    closedApplication(server, cache, createConnection, eventHandler);

    try
    {
        await createConnection.initConfig();
        await createConnection.create();

        await cache.cleanAll();

        eventHandler.setListeners();

        const cronFactory = new CronFactory();
        cronFactory.start();
    }
    catch (error)
    {
        await Logger.info('Error while connecting to the database', error);
        throw error;
    }
})();
