import 'reflect-metadata';
import { Container } from 'inversify';
import Config from 'config';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';
import Responder from './App/Presentation/Shared/Responder';

import IItemRepository from './Item/InterfaceAdapters/IItemRepository';
import IUserRepository from './User/InterfaceAdapters/IUserRepository';
import IRoleRepository from './Role/InterfaceAdapters/IRoleRepository';
import IAuthService from './Auth/InterfaceAdapters/IAuthService';
import IFileRepository from './File/InterfaceAdapters/IFileRepository';

import AuthService from './Auth/Services/AuthService';

import { REPOSITORIES } from './Config/repositories';
import { TYPES } from './types';
import { SERVICES } from './services';

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
import IFileService from './File/InterfaceAdapters/IFileService';
import FileService from './File/Domain/Services/FileService';

const container = new Container();

/* IServices */
container.bind<IAuthService>(SERVICES.IAuthService).to(AuthService);
container.bind<IFileService>(SERVICES.IFileService).to(FileService);

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
if (Config.get('dbConfig.default') === 'TypeORM')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository);
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository);
}
else if (Config.get('dbConfig.default') === 'Mongoose')
{
    container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
    container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
    container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);
    container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository);
}

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

export default container;
