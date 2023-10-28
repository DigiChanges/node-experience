import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';


import MainConfig from './Config/MainConfig';

import IAuthRepository from './Auth/Infrastructure/Repositories/Auth/IAuthRepository';
import IAuthzRepository from './Auth/Infrastructure/Repositories/Auth/IAuthzRepository';
import IUserRepository from './Auth/Infrastructure/Repositories/User/IUserRepository';
import IRoleRepository from './Auth/Infrastructure/Repositories/Role/IRoleRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';

import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

import ItemMikroORMRepository from './Item/Infrastructure/Repositories/ItemMikroORMRepository';

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
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.Singleton });
    container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.Singleton });
}
else if (defaultDbConfig === 'MikroORM')
{
    container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMikroORMRepository }, { lifecycle: Lifecycle.Singleton });
}

container.register<IAuthRepository>(REPOSITORIES.IAuthRepository, { useClass: AuthKeycloakRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IAuthzRepository>(REPOSITORIES.IAuthzRepository, { useClass: AuthzKeycloakRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserKeycloakRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleKeycloakRepository }, { lifecycle: Lifecycle.Singleton });

// Shared
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
