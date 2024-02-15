import 'reflect-metadata';
import { container, DependencyContainer, Lifecycle, instanceCachingFactory } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, SERVICES, REPOSITORIES } from './Injects';

import MainConfig from '../../Config/MainConfig';

import IAuthRepository from '../../Auth/Domain/Repositories/IAuthRepository';
import IItemRepository from '../../Item/Domain/Repositories/IItemRepository';
import INotificationRepository from '../../Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from '../../Notification/Domain/Entities/INotificationDomain';

import ItemMongooseRepository from '../../Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from '../../Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import ItemMikroORMRepository from '../../Item/Infrastructure/Repositories/ItemMikroORMRepository';

import AuthSupabaseRepository from '../../Auth/Infrastructure/Repositories/Auth/AuthSupabaseRepository';

import AuthorizeSupabaseService from '../../Auth/Domain/Services/AuthorizeSupabaseService';
import IBaseRepository from '../../Main/Domain/Repositories/IBaseRepository';
import RedisCacheDataAccess from '../../Main/Infrastructure/Repositories/RedisCacheDataAccess';
import ICacheDataAccess from '../../Main/Infrastructure/Repositories/ICacheDataAccess';
import CacheRepository from '../../Main/Infrastructure/Repositories/CacheRepository';

import DatabaseFactory from '../../Main/Infrastructure/Factories/DatabaseFactory';
import { IMessageBroker } from '../Infrastructure/IMessageBroker';
import RabbitMQMessageBroker from '../Infrastructure/RabbitMQMessageBroker';

const config = MainConfig.getInstance().getConfig();
const defaultDbConfig = config.dbConfig.default;
const cacheConfig = config.cache;

// Data Access Objects
container.register<ICacheDataAccess>(REPOSITORIES.ICacheDataAccess,
    {
        // @ts-ignore
        useFactory: instanceCachingFactory(() => new RedisCacheDataAccess(cacheConfig.redis))
    }, { lifecycle: Lifecycle.Transient }
);

// Repositories
if (defaultDbConfig === 'Mongoose')
{
    // @ts-ignore
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useFactory: instanceCachingFactory((c: DependencyContainer) =>
    {
        let repository: IBaseRepository<unknown> = new ItemMongooseRepository();

        if (cacheConfig.enable)
        {
            const cacheDataAccess: ICacheDataAccess = c.resolve(REPOSITORIES.ICacheDataAccess);
            repository = new CacheRepository(repository, cacheDataAccess);
        }

        return repository;
    }) }, { lifecycle: Lifecycle.Transient });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.Singleton });
}
else if (defaultDbConfig === 'MikroORM')
{
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMikroORMRepository }, { lifecycle: Lifecycle.Singleton });
}

container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthSupabaseRepository }, { lifecycle: Lifecycle.Singleton });

// Shared
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

// Services
container.register(SERVICES.AuthorizeService, {
    // @ts-ignore
    useFactory: instanceCachingFactory((c: DependencyContainer) =>
    {
        const authRepository: IAuthRepository  = c.resolve(REPOSITORIES.IAuthRepository);
        return new AuthorizeSupabaseService(authRepository);
    })
}, { lifecycle: Lifecycle.Transient });
container.register<IMessageBroker>('IMessageBroker', { useClass: RabbitMQMessageBroker }, { lifecycle: Lifecycle.Singleton });

// Factories
container.register<DatabaseFactory>(FACTORIES.IDatabaseFactory, {
    // @ts-ignore
    useFactory: instanceCachingFactory(() =>
    {
        return new DatabaseFactory();
    })
}, { lifecycle: Lifecycle.Transient });

export default container;
