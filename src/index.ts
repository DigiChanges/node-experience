import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from './Application/app';
import { validateEnv } from '../config/validateEnv';
import {loggerCli} from "./Infrastructure/Shared/Logger";
import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";
import FilesystemFactory from "./Infrastructure/Factories/FilesystemFactory";
import IFilesystem from "./InterfaceAdapters/Shared/IFilesystem";

export let filesystem: IFilesystem = null;
import EventHandler from "./Infrastructure/Events/EventHandler";
import ICreateConnection from "./InterfaceAdapters/IDatabase/ICreateConnection";

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection: ICreateConnection = databaseFactory.create();

        createConnection.initConfig();
        await createConnection.create();

        filesystem = FilesystemFactory.create();

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
