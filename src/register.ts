import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy, BcryptEncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';


import MainConfig from './Config/MainConfig';

import IAuthRepository from './Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import IAuthzRepository from './Auth/Infrastructure/Repositories/Auth/IAuthzRepository';
import IUserRepository from './Auth/Infrastructure/Repositories/User/IUserRepository';
import IRoleRepository from './Auth/Infrastructure/Repositories/Role/IRoleRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import IFileVersionRepository from './File/Infrastructure/Repositories/IFileVersionRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';

import FileVersionMongooseRepository from './File/Infrastructure/Repositories/FileVersionMongooseRepository';
import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import ItemMikroORMRepository from './Item/Infrastructure/Repositories/ItemMikroORMRepository';
import FileVersionMikroORMRepository from './File/Infrastructure/Repositories/FileVersionMikroORMRepository';

import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';
import FileMikroORMRepository from './File/Infrastructure/Repositories/FileMikroORMRepository';
import AuthKeycloakRepository from './Auth/Infrastructure/Repositories/Auth/AuthKeycloakRepository';

import AuthzKeycloakRepository from './Auth/Infrastructure/Repositories/Auth/AuthzKeycloakRepository';
import UserKeycloakRepository from './Auth/Infrastructure/Repositories/User/UserKeycloakRepository';
import RoleKeycloakRepository from './Auth/Infrastructure/Repositories/Role/RoleKeycloakRepository';

import AuthorizeService from './Auth/Domain/Services/AuthorizeService';
import KeycloakAuthService from './Auth/Domain/Services/KeyacloakAuthService';

// Services
container.register(SERVICES.KeycloakAuthService, { useClass: KeycloakAuthService }, { lifecycle: Lifecycle.Singleton });
container.register(SERVICES.AuthorizeService, { useClass: AuthorizeService }, { lifecycle: Lifecycle.Singleton });

// Repositories
const defaultDbConfig = MainConfig.getInstance().getConfig().dbConfig.default;

if (defaultDbConfig === 'Mongoose')
{
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
}
else if (defaultDbConfig === 'MikroORM')
{
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository, { useClass: FileVersionMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
    container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMikroORMRepository }, { lifecycle: Lifecycle.ContainerScoped });
}

container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthKeycloakRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IAuthzRepository>(REPOSITORIES.IAuthzRepository, { useClass: AuthzKeycloakRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserKeycloakRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleKeycloakRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
