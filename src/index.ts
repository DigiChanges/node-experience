import dotenv from 'dotenv';
dotenv.config(); // Need before get config
import Config from 'config';

import { validateEnv } from './Config/validateEnv';
import { loggerCli } from './Shared/Logger';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICacheRepository, ICreateConnection, StatusCode } from '@digichanges/shared-experience';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as HttpStatus from 'http-status-codes';
import AppFactory from './App/Presentation/Factories/AppFactory';
import IndexHandler from './App/Presentation/Handlers/Koa/IndexHandler';
import ItemHandler from './Item/Presentation/Handlers/Koa/ItemHandler';
import Responder from './App/Presentation/Shared/Koa/Responder';
import ErrorHttpException from './App/Presentation/Shared/ErrorHttpException';
import { ErrorExceptionMapper } from './App/Presentation/Shared/ErrorExceptionMapper';
import FormatError from './App/Presentation/Shared/FormatError';
import Locales from './App/Presentation/Shared/Locales';

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

        const app = AppFactory.create('AppKoa');
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
