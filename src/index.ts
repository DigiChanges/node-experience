import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './Application/app';
import { validateEnv } from '../config/validateEnv';
import {loggerCli} from "./Infrastructure/Shared/Logger";
import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";
import FilesystemFactory from "./Infrastructure/Factories/FilesystemFactory";
import IFilesystem from "./InterfaceAdapters/Shared/IFilesystem";

export let filesystem: IFilesystem = null;

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection = databaseFactory.create();

        await createConnection.create();

        filesystem = FilesystemFactory.create();

        const app = new App();
        await app.listen();
    }
    catch (error)
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
