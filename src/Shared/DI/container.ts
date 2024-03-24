import 'reflect-metadata';
import { container, DependencyContainer, Lifecycle, instanceCachingFactory } from 'tsyringe';

import { FACTORIES, SERVICES, REPOSITORIES } from './Injects';

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
import CronService, { ICronService } from '../../Main/Infrastructure/Factories/CronService';
import { MainConfig } from '../../Config/MainConfig';

import IFileVersionRepository from '../../File/Domain/Repositories/IFileVersionRepository';
import IFileRepository from '../../File/Domain/Repositories/IFileRepository';
import FileVersionMongooseRepository from '../../File/Infrastructure/Repositories/FileVersionMongooseRepository';
import FileMongooseRepository from '../../File/Infrastructure/Repositories/FileMongooseRepository';

import EventHandler, { IEventHandler } from '../../Notification/Domain/Models/EventHandler';
import { IEncryption, Md5EncryptionStrategy } from '../../Main/Infrastructure/Encryption';
import { IFilesystem } from '../../Main/Domain/Shared/IFilesystem';
import { MinioStrategy } from '../../Main/Infrastructure/Filesystem';

const config = MainConfig.getEnv();
const defaultDbConfig = config.DB_ORM_DEFAULT;
const cacheConfig = {
    host: config.CACHE_HOST,
    port: config.CACHE_PORT,
    enable: config.CACHE_ENABLE,
    user: config.CACHE_USER,
    password: config.CACHE_PASSWORD
};

const filesystemConfig = {
    endPoint: config.MINIO_HOST,
    accessKey: config.MINIO_ACCESS_KEY,
    secretKey: config.MINIO_SECRET_KEY,
    useSSL: config.MINIO_USE_SSL,
    port: config.MINIO_PORT,
    publicBucket: config.MINIO_PUBLIC_BUCKET,
    privateBucket: config.MINIO_PRIVATE_BUCKET,
    rootPath: '/data',
    region: config.MINIO_REGION
};

// Data Access Objects
container.register<ICacheDataAccess>(REPOSITORIES.ICacheDataAccess,
    {
        // @ts-ignore
        useFactory: instanceCachingFactory(() => new RedisCacheDataAccess(cacheConfig))
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
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
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

container.register<IEventHandler>('IEventHandler',
    { useClass: EventHandler },
    { lifecycle: Lifecycle.Singleton });

container.register<ICronService>('ICronService', {
    // @ts-ignore
    useFactory: instanceCachingFactory(() =>
    {
        return new CronService({ executeCrons: config.EXECUTE_CRONS });
    })
}, { lifecycle: Lifecycle.Transient });

// Factories
container.register<DatabaseFactory>(FACTORIES.IDatabaseFactory, {
    // @ts-ignore
    useFactory: instanceCachingFactory(() =>
    {
        return new DatabaseFactory();
    })
}, { lifecycle: Lifecycle.Transient });

container.register<IFilesystem>('IFilesystem', {
    // @ts-ignore
    useFactory: instanceCachingFactory(() =>
    {
        return new MinioStrategy(filesystemConfig);
    })
}, { lifecycle: Lifecycle.Transient });

export default container;
