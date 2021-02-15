import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './Application/app';
import { validateEnv } from './Config/validateEnv';
import {loggerCli} from "./Infrastructure/Shared/Logger";
import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";

import EventHandler from "./Infrastructure/Events/EventHandler";
import CacheFactory from "./Infrastructure/Factories/CacheFactory";
import Config from "config";
import {ICacheRepository, ICreateConnection} from "@digichanges/shared-experience";

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection: ICreateConnection = databaseFactory.create();

        createConnection.initConfig();
        await createConnection.create();

        let cache: ICacheRepository = CacheFactory.createRedisCache(); // Create for redis repository
        await cache.createConnection(Config.get("cache.redis")); // Create connection for cache
        await cache.cleanAll();

        const eventHandler = EventHandler.getInstance();

        const app = new App();
        await app.initConfig();
        await app.build();
        await app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
