import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import App from '../Application/app';
import { validateEnv } from '../../config/validateEnv';
import {loggerCli} from '../Infrastructure/Shared/Logger';
import DatabaseFactory from '../Infrastructure/Factories/DatabaseFactory';
// import FilesystemFactory from '../Infrastructure/Factories/FilesystemFactory';
import IFilesystem from '../InterfaceAdapters/Shared/IFilesystem';

export let filesystem: IFilesystem = null;
import EventHandler from '../Infrastructure/Events/EventHandler';
import ICreateConnection from '../InterfaceAdapters/IDatabase/ICreateConnection';
import SeedFactory from "../Infrastructure/Seeds/SeedFactory";

export let request: supertest.SuperTest<supertest.Test>;
export let dbConnection: ICreateConnection;

beforeAll((async () => {
    try {
        console.log("GLOBAL SETUP")

        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        dbConnection = databaseFactory.create();

        dbConnection.initConfigTest(process.env.MONGO_URL);
        await dbConnection.create();

        // TODO: Add filesystem test (MINIO)
        // filesystem = FilesystemFactory.create();

        const eventHandler = EventHandler.getInstance();

        const application = new App();
        await application.initConfig();
        await application.build();
        const app = application.getApp();

        request = supertest(app);
    }
    catch (error)
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
}));

afterAll((async () => {
    await dbConnection.close();
}));
