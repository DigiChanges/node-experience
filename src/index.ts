import 'reflect-metadata';
import MainConfig from './Config/mainConfig';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICreateConnection } from '@digichanges/shared-experience';
import ICacheRepository from './App/Infrastructure/Repositories/ICacheRepository';

import AppFactory from './App/Presentation/Factories/AppFactory';
import CronFactory from './Shared/Factories/CronFactory';
import Logger from './Shared/Logger/Logger';

void (async() =>
{
    const config = MainConfig.getInstance();
    const app = AppFactory.create('AppKoa', {
        viewRouteEngine: `${process.cwd()}/dist/src/App/Presentation/Views`,
        serverPort: config.getConfig().serverPort
    });
    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();
    const cache: ICacheRepository = CacheFactory.createRedisCache();
    const eventHandler = EventHandler.getInstance();

    try
    {
        createConnection.initConfig();
        await createConnection.create();

        await cache.createConnection(config.getConfig().cache.redis);
        await cache.cleanAll();

        await eventHandler.setListeners();

        const cronFactory = new CronFactory();
        cronFactory.start();


        app.initConfig();
        app.build();
        app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        Logger.info('Error while connecting to the database', error);
        return error;
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

