import 'reflect-metadata';
import { Container } from 'inversify';
import MainConfig from './Config/mainConfig';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';
import Responder from './App/Presentation/Shared/Express/Responder';

import IItemRepository from './Item/InterfaceAdapters/IItemRepository';
import IUserRepository from './User/InterfaceAdapters/IUserRepository';
import IRoleRepository from './Role/InterfaceAdapters/IRoleRepository';
import IFileRepository from './File/InterfaceAdapters/IFileRepository';

import { REPOSITORIES } from './Config/Injects/repositories';
import { TYPES } from './Config/Injects/types';

import ItemMongoRepository from './Item/Infrastructure/Repositories/ItemMongoRepository';
import UserMongoRepository from './User/Infrastructure/Repositories/UserMongoRepository';
import RoleMongoRepository from './Role/Infrastructure/Repositories/RoleMongoRepository';
import FileMongoRepository from './File/Infrastructure/Repositories/FileMongoRepository';

import ItemSqlRepository from './Item/Infrastructure/Repositories/ItemSqlRepository';
import UserSqlRepository from './User/Infrastructure/Repositories/UserSqlRepository';
import FileSqlRepository from './File/Infrastructure/Repositories/FileSqlRepository';
import RoleSqlRepository from './Role/Infrastructure/Repositories/RoleSqlRepository';
import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';
import { ITokenRepository } from '@digichanges/shared-experience';
import ITokenDomain from './Auth/InterfaceAdapters/ITokenDomain';
import INotificationRepository from './Notification/InterfaceAdapters/INotificationRepository';
import INotificationDomain from './Notification/InterfaceAdapters/INotificationDomain';
import NotificationMongoRepository from './Notification/Infrastructure/Repositories/NotificationMongoRepository';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import { FACTORIES } from './Config/Injects/factories';
import NotificationFactory from './Notification/Shared/NotificationFactory';

const container = new Container();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
if (MainConfig.getInstance().getConfig().dbConfig.default === 'TypeORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository);
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository);
}
else if (MainConfig.getInstance().getConfig().dbConfig.default === 'Mongoose')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository);
    container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);
}

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

/* Factories */
container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(NotificationFactory);

export default container;
