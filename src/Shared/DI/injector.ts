import { InjectorContext, InjectorModule } from '@deepkit/injector';

import NotificationMongooseRepository from '../../Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import RedisCacheDataAccess from '../../Main/Infrastructure/Repositories/RedisCacheDataAccess';

import RabbitMQMessageBroker from '../Infrastructure/RabbitMQMessageBroker';
import CronService from '../../Main/Infrastructure/Factories/CronService';
import { MainConfig } from '../../Config/MainConfig';

import EventHandler from '../../Notification/Domain/Models/EventHandler';
import { Md5EncryptionStrategy } from '../../Main/Infrastructure/Encryption';
import { FACTORIES, REPOSITORIES } from './Injects';
import CreateMongooseConnection from '../../Main/Infrastructure/Database/CreateMongooseConnection';
import { itemModule } from '../../Item/module';
import { fileModule } from '../../File/module';
import { authModule } from '../../Auth/module';

const config = MainConfig.getEnv();
const cacheConfig = {
    host: config.CACHE_HOST,
    port: config.CACHE_PORT,
    enable: config.CACHE_ENABLE,
    user: config.CACHE_USER,
    password: config.CACHE_PASSWORD
};

const rootModule = new InjectorModule([
    { provide: 'ICreateConnection', useFactory: () =>
    {
        return new CreateMongooseConnection({ uri: config.DB_URI });
    } },
    { provide: REPOSITORIES.ICacheDataAccess, useFactory: () =>
    {
        return new RedisCacheDataAccess(cacheConfig);
    } },
    { provide: REPOSITORIES.INotificationRepository, useClass: NotificationMongooseRepository },
    { provide: FACTORIES.Md5EncryptionStrategy, useClass: Md5EncryptionStrategy },
    { provide: 'IMessageBroker', useClass: RabbitMQMessageBroker },
    { provide: 'IEventHandler', useClass: EventHandler },
    { provide: 'ICronService', useFactory: () =>
    {
        return new CronService({ executeCrons: config.EXECUTE_CRONS });
    } }
])
    .addImport(itemModule)
    .addImport(fileModule)
    .addImport(authModule);

const injector = new InjectorContext(rootModule);

export default injector;
