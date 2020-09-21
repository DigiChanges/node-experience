import "reflect-metadata";
import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";

import FormatResponder from "./Presentation/Shared/FormatResponder";
import IFormatResponder from "./InterfaceAdapters/Shared/IFormatResponder";
import Responder from "./Presentation/Shared/Responder";

import IItemRepository from "./InterfaceAdapters/IRepositories/IItemRepository";
import ItemMongoRepository from "./Infrastructure/Repositories/ItemMongoRepository";
import IUserRepository from "./InterfaceAdapters/IRepositories/IUserRepository";
import IRoleRepository from "./InterfaceAdapters/IRepositories/IRoleRepository";
import IAuthService from "./InterfaceAdapters/IServices/IAuthService";
import AuthService from "./Application/Services/AuthService";
import {REPOSITORIES} from "./repositories";
import {TYPES} from "./types";
import UserMongoRepository from "./Infrastructure/Repositories/UserMongoRepository";
import RoleMongoRepository from "./Infrastructure/Repositories/RoleMongoRepository";
import IFileRepository from "./InterfaceAdapters/IRepositories/IFileRepository";
import FileMongoRepository from "./Infrastructure/Repositories/FileMongoRepository";


const container = new Container();

/* IServices */
container.bind<IAuthService>(REPOSITORIES.IAuthService).to(AuthService);

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository);

export let { lazyInject } = getDecorators(container);

export default container;