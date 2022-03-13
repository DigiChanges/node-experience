import 'reflect-metadata';
import MainConfig from './Config/mainConfig';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICacheRepository, ICreateConnection } from '@digichanges/shared-experience';

import AppFactory from './App/Presentation/Factories/AppFactory';
import CronFactory from './Shared/Factories/CronFactory';
import Logger from './Shared/Logger/Logger';

void (async() =>
{
    try
    {
        const config = MainConfig.getInstance();

        const databaseFactory = new DatabaseFactory();
        const createConnection: ICreateConnection = databaseFactory.create();

        createConnection.initConfig();
        await createConnection.create();

        const cache: ICacheRepository = CacheFactory.createRedisCache();
        await cache.createConnection(config.getConfig().cache.redis);
        await cache.cleanAll();

        const eventHandler = EventHandler.getInstance();
        await eventHandler.setListeners();

        const cronFactory = new CronFactory();
        cronFactory.start();

        const app = AppFactory.create('AppKoa', {
            viewRouteEngine: `${process.cwd()}/dist/src/App/Presentation/Views`,
            localesDirectory: `${process.cwd()}/dist/src/Config/Locales`,
            serverPort: config.getConfig().serverPort
        });

        app.initConfig();
        app.build();
        app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        Logger.info('Error while connecting to the database', error);
        return error;
    }
})();
