import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './Application/app';
import { validateEnv } from '../config/validateEnv';
import Config from "config";
import {createConnection} from "typeorm";
import {loggerCli} from "./Infrastructure/Shared/Logger";

(async () => {
    try {
        // Initialize configuration
        validateEnv();
        const configDb: any = Config.get('dbConfig');

        await createConnection({...configDb}); // Create connection for typeORM
    } catch (error) {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }

    const app = new App();
    await app.listen();
})();
