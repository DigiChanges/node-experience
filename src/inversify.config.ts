import { Container } from 'inversify';
import MainConfig from './Config/mainConfig';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';
import Responder from './App/Presentation/Shared/Http/Express/Responder';

import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IUserRepository from './User/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Role/Infrastructure/Repositories/IRoleRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';

import { REPOSITORIES } from './Config/Injects/repositories';
import { TYPES } from './Config/Injects/types';

import ItemMongoRepository from './Item/Infrastructure/Repositories/ItemMongoRepository';
import UserMongooseRepository from './User/Infrastructure/Repositories/UserMongooseRepository';
import RoleMongooseRepository from './Role/Infrastructure/Repositories/RoleMongooseRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';

import ItemSqlRepository from './Item/Infrastructure/Repositories/ItemSqlRepository';
import UserTypeORMRepository from './User/Infrastructure/Repositories/UserTypeORMRepository';
import FileTypeORMRepository from './File/Infrastructure/Repositories/FileTypeORMRepository';
import RoleTypeORMRepository from './Role/Infrastructure/Repositories/RoleTypeORMRepository';
import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';
import { ITokenRepository } from '@digichanges/shared-experience';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import { FACTORIES } from './Config/Injects/factories';
import NotificationFactory from './Notification/Shared/NotificationFactory';
import RoleMikroORMRepository from './Role/Infrastructure/Repositories/RoleMikroORMRepository';
import UserMikroORMRepository from './User/Infrastructure/Repositories/UserMikroORMRepository';
import ItemMikroSqlRepository from './Item/Infrastructure/Repositories/ItemMikroSqlRepository';
import FileMikroORMRepository from './File/Infrastructure/Repositories/FileMikroORMRepository';

const container = new Container();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
if (MainConfig.getInstance().getConfig().dbConfig.default === 'TypeORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserTypeORMRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleTypeORMRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileTypeORMRepository).inSingletonScope();
}
else if (MainConfig.getInstance().getConfig().dbConfig.default === 'Mongoose')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongooseRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongooseRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongooseRepository).inSingletonScope();
    container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongooseRepository).inSingletonScope();
}
else if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMikroSqlRepository).inSingletonScope();
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMikroORMRepository).inSingletonScope();
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMikroORMRepository).inSingletonScope();
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMikroORMRepository).inSingletonScope();
    // container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongooseRepository).inSingletonScope();
}

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

/* Factories */
container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(NotificationFactory);

export default container;
