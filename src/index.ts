import dotenv from 'dotenv';
dotenv.config(); // Need before get config
import Config from 'config';

import { validateEnv } from './Config/validateEnv';
import { loggerCli } from './Shared/Logger';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICacheRepository, ICreateConnection } from '@digichanges/shared-experience';

import AppFactory from './App/Presentation/Factories/AppFactory';


void (async() =>
{
    try
    {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();
        const createConnection: ICreateConnection = databaseFactory.create();

        createConnection.initConfig();
        await createConnection.create();

        const cache: ICacheRepository = CacheFactory.createRedisCache(); // Create for redis repository
        await cache.createConnection(Config.get('cache.redis')); // Create connection for cache
        await cache.cleanAll();

        const eventHandler = EventHandler.getInstance();
        await eventHandler.setListeners();

        const app = AppFactory.create('AppKoa', {
            viewRouteEngine: `${Config.get('nodePath')}/dist/src/App/Presentation/Views`,
            localesDirectory: `${Config.get('nodePath')}/dist/src/Config/Locales`,
            serverPort: Config.get('serverPort')
        });

        app.initConfig();
        app.build();
        app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
