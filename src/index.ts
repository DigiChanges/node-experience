import 'reflect-metadata';
import './inversify.config';
import './register';

import MainConfig from './Config/MainConfig';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICreateConnection } from '@digichanges/shared-experience';
import ICacheRepository from './App/Infrastructure/Repositories/ICacheRepository';

import CronFactory from './Shared/Factories/CronFactory';
import Logger from './Shared/Logger/Logger';
import IApp from './App/InterfaceAdapters/IApp';
import AppFactory from './Shared/Factories/AppFactory';

void (async() =>
{
    const config = MainConfig.getInstance().getConfig();
    const app: IApp = AppFactory.create(config.app.default);

    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();
    const cache: ICacheRepository = CacheFactory.createRedisCache();
    const eventHandler = EventHandler.getInstance();

    try
    {
        createConnection.initConfig();
        await createConnection.create();

        await cache.createConnection(config.cache.redis);
        await cache.cleanAll();

        await eventHandler.setListeners();

        const cronFactory = new CronFactory();
        cronFactory.start();

        app.initConfig({
            serverPort: config.serverPort
        });
        await app.build();
        app.listen();
    }
    catch (error)
    {
        Logger.info('Error while connecting to the database', error);
        throw error;
    }

    async function closeGracefully(signal: any)
    {
        app.close();
        await createConnection.close();
        cache.close();
        await eventHandler.removeListeners();

        process.kill(process.pid, signal);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGINT', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGTERM', closeGracefully);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.once('SIGUSR2', closeGracefully);
})();
