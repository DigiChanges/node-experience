import dotenv from 'dotenv';
dotenv.config();

import DependencyInjector from './Shared/DI/DependencyInjector';
import { FACTORIES, REPOSITORIES } from './Shared/DI/Injects';

import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';

import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import Logger from './Shared/Helpers/Logger';
import closedApplication from './closed';
import ICacheDataAccess from './Main/Infrastructure/Repositories/ICacheDataAccess';
import { IMessageBroker } from './Shared/Infrastructure/IMessageBroker';
import NotificationEmailJob from './Notification/Infrastructure/Jobs/NotificationEmailJob';

import { MainConfig } from './Config/MainConfig';

void (async() =>
{
    try
    {
        const config = MainConfig.getEnv();

        // Init Application
        // Create DB connection
        const databaseFactory = DependencyInjector.inject<DatabaseFactory>(FACTORIES.IDatabaseFactory);
        const createConnection: ICreateConnection = databaseFactory.create();
        await createConnection.initConfig();
        await createConnection.create();

        // Message Broker
        const messageBroker = DependencyInjector.inject<IMessageBroker>('IMessageBroker');
        await messageBroker.connect({ uri: MainConfig.getEnv().MESSAGE_BROKER_URI });
        await messageBroker.subscribe({
            queue: 'email',
            job: new NotificationEmailJob(),
            queueOptions: {
                durable: true,
                expires: 60000,
                maxPriority: 10
            }
        });

        Logger.info('Worker Initialized');

        // Create Cache connection
        let cache: ICacheDataAccess;

        if (MainConfig.getEnv().CACHE_ENABLE)
        {
            cache = DependencyInjector.inject<ICacheDataAccess>(REPOSITORIES.ICacheDataAccess);
            await cache.cleanAll();
        }

        closedApplication({
            cache,
            createConnection,
            messageBroker
        });
    }
    catch (error)
    {
        Logger.info('Error while connecting to the database', error);
        throw error;
    }
})();
