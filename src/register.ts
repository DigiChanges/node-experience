import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';

import { IEncryption, ITokenRepository } from '@digichanges/shared-experience';
import BcryptEncryptionStrategy from './Shared/Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from './Shared/Encryption/Md5EncryptionStrategy';

import MainConfig from './Config/MainConfig';

import INotifierStrategy from './Notification/Shared/INotifierStrategy';
import EmailStrategy from './Notification/Shared/EmailStrategy';
import WebPushStrategy from './Notification/Shared/WebPushStrategy';


import AuthService from './Auth/Domain/Services/AuthService';
import UserService from './User/Domain/Services/UserService';

import IUserRepository from './User/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Role/Infrastructure/Repositories/IRoleRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';

import UserMongooseRepository from './User/Infrastructure/Repositories/UserMongooseRepository';
import RoleMongooseRepository from './Role/Infrastructure/Repositories/RoleMongooseRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';
import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import UserTypeORMRepository from './User/Infrastructure/Repositories/UserTypeORMRepository';
import RoleTypeORMRepository from './Role/Infrastructure/Repositories/RoleTypeORMRepository';
import FileTypeORMRepository from './File/Infrastructure/Repositories/FileTypeORMRepository';
import ItemTypeORMRepository from './Item/Infrastructure/Repositories/ItemTypeORMRepository';

import UserMikroORMRepository from './User/Infrastructure/Repositories/UserMikroORMRepository';
import RoleMikroORMRepository from './Role/Infrastructure/Repositories/RoleMikroORMRepository';
import ItemMikroORMRepository from './Item/Infrastructure/Repositories/ItemMikroORMRepository';
import FileMikroORMRepository from './File/Infrastructure/Repositories/FileMikroORMRepository';

import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';

// Services
container.register(SERVICES.AuthService, { useClass: AuthService }, { lifecycle: Lifecycle.Singleton });
container.register(SERVICES.UserService, { useClass: UserService }, { lifecycle: Lifecycle.Singleton });

// Repositories
const defaultDbConfig = MainConfig.getInstance().getConfig().dbConfig.default;

if (defaultDbConfig === 'TypeORM')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
}
else if (defaultDbConfig === 'Mongoose')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
}
else if (defaultDbConfig === 'MikroORM')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
}

container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenRedisRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

container.register<INotifierStrategy>(FACTORIES.EmailStrategy, { useClass: EmailStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<INotifierStrategy>(FACTORIES.WebPushStrategy, { useClass: WebPushStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
