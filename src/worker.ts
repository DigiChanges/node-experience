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
import MainConfig from './Config/MainConfig';
import NotificationEmailJob from './Notification/Infrastructure/Jobs/NotificationEmailJob';
import { EventHandler } from '@digichanges/shared-experience';
import EmailEvent from './Auth/Infrastructure/Events/EmailEvent';
import SendMessageEvent from './Notification/Domain/Events/SendMessageEvent';

void (async() =>
{
    try
    {
        const config = MainConfig.getInstance().getConfig();

        // Init Application
        // Create DB connection
        const databaseFactory = DependencyInjector.inject<DatabaseFactory>(FACTORIES.IDatabaseFactory);
        const createConnection: ICreateConnection = databaseFactory.create();
        await createConnection.initConfig();
        await createConnection.create();

        // Set EventHandler and all events
        const eventHandler = EventHandler.getInstance();
        eventHandler.setEvent(new EmailEvent());
        eventHandler.setEvent(new SendMessageEvent());

        // Message Broker
        const messageBroker = DependencyInjector.inject<IMessageBroker>('IMessageBroker');
        await messageBroker.connect(config.messageBroker);
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

        if (config.cache.enable)
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
