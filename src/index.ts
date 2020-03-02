import dotenv from 'dotenv';
import App from './app';
import { validateEnv } from '../config/validateEnv';
import config from '../ormconfig';
import { createConnection } from "typeorm";

(async () => {
    try {
        // Initialize configuration
        validateEnv();
        dotenv.config();

        console.log(config);
        await createConnection(config); // Create connection for typeORM
    } catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }

    const app = new App();
    app.listen();
})();
