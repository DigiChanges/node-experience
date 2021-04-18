import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './app';
import {validateEnv} from './Config/validateEnv';
import {loggerCli} from './App/Infrastructure/Shared/Logger';
import DatabaseFactory from './App/Infrastructure/Factories/DatabaseFactory';

import EventHandler from './App/Infrastructure/Events/EventHandler';
import CacheFactory from './App/Infrastructure/Factories/CacheFactory';
import Config from 'config';
import {ICacheRepository, ICreateConnection} from '@digichanges/shared-experience';

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

        const app = new App();
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
