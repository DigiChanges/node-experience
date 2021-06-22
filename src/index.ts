import dotenv from 'dotenv';
dotenv.config(); // Need before get config
import Config from 'config';

import { validateEnv } from './Config/validateEnv';
import { loggerCli } from './Shared/Logger';
import DatabaseFactory from './Shared/Factories/DatabaseFactory';

import EventHandler from './Shared/Events/EventHandler';
import CacheFactory from './Shared/Factories/CacheFactory';
import { ICacheRepository, ICreateConnection } from '@digichanges/shared-experience';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as HttpStatus from 'http-status-codes';
import AppFactory from './App/Presentation/Factories/AppFactory';
import IndexHandler from './App/Presentation/Handlers/Koa/IndexHandler';
import ItemHandler from './Item/Presentation/Handlers/Koa/ItemHandler';

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

        const app: Koa = new Koa();

        // Generic error handling middleware.
        app.use(async(ctx: Koa.Context, next: () => Promise<any>) =>
        {
            try
            {
                await next();
            }
            catch (error)
            {
                ctx.status = error.statusCode || error.status || 500;
                error.status = ctx.status;
                ctx.body = {error};
                ctx.app.emit('error', error, ctx);
            }
        });

        app.use(bodyParser());

        // Route middleware.
        app.use(IndexHandler.routes());
        app.use(IndexHandler.allowedMethods());
        app.use(ItemHandler.routes());
        app.use(ItemHandler.allowedMethods());

        // Application error logging.
        app.on('error', console.error);

        const server = app.listen(8089, () =>
        {
            loggerCli.debug('Koa is listening to http://localhost:8089');
        });
        // const appFactory = new AppFactory();
        // const app = appFactory.create();
        // app.initConfig();
        // app.build();
        // app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
