import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';

import BcryptEncryptionStrategy from './Shared/Infrastructure/Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from './Shared/Infrastructure/Encryption/Md5EncryptionStrategy';

import MainConfig from './Config/MainConfig';

import AuthService from './Auth/Domain/Services/AuthService';

import IUserRepository from './Auth/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Auth/Infrastructure/Repositories/IRoleRepository';
import ICategoryRepository from './Category/Infrastructure/Repositories/ICategoryRepository';
import IProductRepository from './Product/Infrastructure/Repositories/IProductRepository';
import IFileVersionRepository from './File/Infrastructure/Repositories/IFileVersionRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';

import UserMongooseRepository from './Auth/Infrastructure/Repositories/UserMongooseRepository';
import RoleMongooseRepository from './Auth/Infrastructure/Repositories/RoleMongooseRepository';
import FileVersionMongooseRepository from './File/Infrastructure/Repositories/FileVersionMongooseRepository';
import CategoryMongooseRepository from './Category/Infrastructure/Repositories/CategoryMongooseRepository';
import ProductMongooseRepository from './Product/Infrastructure/Repositories/ProductMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';
import IEncryption from './Shared/Infrastructure/Encryption/IEncryption';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';

// Services
container.register(SERVICES.AuthService, { useClass: AuthService }, { lifecycle: Lifecycle.Singleton });

// Repositories
const defaultDbConfig = MainConfig.getInstance().getConfig().dbConfig.default;

if (defaultDbConfig === 'Mongoose')
{
    container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<ICategoryRepository>(REPOSITORIES.ICategoryRepository, { useClass: CategoryMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IProductRepository>(REPOSITORIES.IProductRepository, { useClass: ProductMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
}

container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenRedisRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
