import { Container } from 'inversify';
import MainConfig from './Config/mainConfig';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';
import Responder from './App/Presentation/Shared/Express/Responder';

import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IUserRepository from './User/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Role/Infrastructure/Repositories/IRoleRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';

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
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import NotificationMongoRepository from './Notification/Infrastructure/Repositories/NotificationMongoRepository';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import { FACTORIES } from './Config/Injects/factories';
import NotificationFactory from './Notification/Shared/NotificationFactory';
import RoleMikroSqlRepository from './Role/Infrastructure/Repositories/RoleMikroSqlRepository';
import UserMikroSqlRepository from './User/Infrastructure/Repositories/UserMikroSqlRepository';
import ItemMikroSqlRepository from './Item/Infrastructure/Repositories/ItemMikroSqlRepository';
import FileMikroSqlRepository from './File/Infrastructure/Repositories/FileMikroSqlRepository';

const container = new Container();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
if (MainConfig.getInstance().getConfig().dbConfig.default === 'TypeORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository).inSingletonScope();
}
else if (MainConfig.getInstance().getConfig().dbConfig.default === 'Mongoose')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository).inSingletonScope();
    container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository).inSingletonScope();
}
else if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMikroSqlRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMikroSqlRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMikroSqlRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMikroSqlRepository).inSingletonScope();
    // container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository).inSingletonScope();
}

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

/* Factories */
container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(NotificationFactory);

export default container;
