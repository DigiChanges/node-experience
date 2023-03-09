import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';

import BcryptEncryptionStrategy from './Shared/Infrastructure/Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from './Shared/Infrastructure/Encryption/Md5EncryptionStrategy';

import MainConfig from './Config/MainConfig';

import AuthService from './Auth/Domain/Services/AuthService';

import IUserRepository from './Auth/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Auth/Infrastructure/Repositories/IRoleRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IFileVersionRepository from './File/Infrastructure/Repositories/IFileVersionRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';

import UserMongooseRepository from './Auth/Infrastructure/Repositories/UserMongooseRepository';
import RoleMongooseRepository from './Auth/Infrastructure/Repositories/RoleMongooseRepository';
import FileVersionMongooseRepository from './File/Infrastructure/Repositories/FileVersionMongooseRepository';
import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import UserTypeORMRepository from './Auth/Infrastructure/Repositories/UserTypeORMRepository';
import RoleTypeORMRepository from './Auth/Infrastructure/Repositories/RoleTypeORMRepository';
import FileVersionTypeORMRepository from './File/Infrastructure/Repositories/FileVersionTypeORMRepository';
import ItemTypeORMRepository from './Item/Infrastructure/Repositories/ItemTypeORMRepository';

import UserMikroORMRepository from './Auth/Infrastructure/Repositories/UserMikroORMRepository';
import RoleMikroORMRepository from './Auth/Infrastructure/Repositories/RoleMikroORMRepository';
import ItemMikroORMRepository from './Item/Infrastructure/Repositories/ItemMikroORMRepository';
import FileVersionMikroORMRepository from './File/Infrastructure/Repositories/FileVersionMikroORMRepository';

import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';
import IEncryption from './Shared/Infrastructure/Encryption/IEncryption';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import FileTypeORMRepository from './File/Infrastructure/Repositories/FileTypeORMRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';
import FileMikroORMRepository from './File/Infrastructure/Repositories/FileMikroORMRepository';
import IAuthRepository from './Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import AuthKeycloakRepository from './Auth/Infrastructure/Repositories/Auth/AuthKeycloakRepository';

// Services
container.register(SERVICES.AuthService, { useClass: AuthService }, { lifecycle: Lifecycle.Singleton });

// Repositories
const defaultDbConfig = MainConfig.getInstance().getConfig().dbConfig.default;

if (defaultDbConfig === 'TypeORM')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileTypeORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
}
else if (defaultDbConfig === 'Mongoose')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
}
else if (defaultDbConfig === 'MikroORM')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
}

container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthKeycloakRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenRedisRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
