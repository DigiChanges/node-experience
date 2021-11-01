
import { validateEnv } from './Config/validateEnv';
import { mainConfig } from './Config/mainConfig';
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
        validateEnv();

        const databaseFactory = new DatabaseFactory();
        const createConnection: ICreateConnection = databaseFactory.create();

        createConnection.initConfig();
        await createConnection.create();

        const cache: ICacheRepository = CacheFactory.createRedisCache();
        await cache.createConnection(mainConfig.cache.redis);
        await cache.cleanAll();

        const eventHandler = EventHandler.getInstance();
        await eventHandler.setListeners();

        const app = AppFactory.create('AppExpress', {
            viewRouteEngine: `${mainConfig.nodePath}/dist/App/Presentation/Views`,
            localesDirectory: `${mainConfig.nodePath}/dist/src/Config/Locales`,
            serverPort: mainConfig.serverPort
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
