import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './Application/app';
import { validateEnv } from '../config/validateEnv';
import {loggerCli} from "./Infrastructure/Shared/Logger";
import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection = databaseFactory.create();

        await createConnection.create();

        const app = new App();
        await app.listen();
    }
    catch (error)
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
