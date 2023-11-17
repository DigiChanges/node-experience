import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';


import MainConfig from './Config/MainConfig';

import IAuthRepository from './Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';

import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import ItemMikroORMRepository from './Item/Infrastructure/Repositories/ItemMikroORMRepository';

import AuthSupabaseRepository from './Auth/Infrastructure/Repositories/Auth/AuthSupabaseRepository';

import AuthorizeSupabaseService from './Auth/Domain/Services/AuthorizeSupabaseService';

// Repositories
const defaultDbConfig = MainConfig.getInstance().getConfig().dbConfig.default;

if (defaultDbConfig === 'Mongoose')
{
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.Singleton });
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
    useFactory: (c: any) =>
    {
        // Resolve the IAuthRepository dependency here
        const authRepository = c.resolve(REPOSITORIES.IAuthRepository);
        return new AuthorizeSupabaseService(authRepository);
    }
}, { lifecycle: Lifecycle.Transient });

export default container;
