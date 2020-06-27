import "reflect-metadata";
import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import {TYPES} from "./types";
import {REPOSITORIES} from "./repositories";
import {SERVICES} from "./services";

import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import Responder from "./Lib/Responder";

import IItemRepository from "./InterfaceAdapters/IRepositories/IItemRepository";
import ItemMongoRepository from "./Infrastructure/Repositories/ItemMongoRepository";
import IUserRepository from "./InterfaceAdapters/IRepositories/IUserRepository";
import UserMongoRepository from "./Infrastructure/Repositories/UserMongoRepository";
import IRoleRepository from "./InterfaceAdapters/IRepositories/IRoleRepository";
import RoleMongoRepository from "./Infrastructure/Repositories/RoleMongoRepository";

import UserService from "./Domain/Services/UserService";
import ItemService from "./Domain/Services/ItemService";
import RoleService from "./Domain/Services/RoleService";
import AuthService from "./Domain/Services/AuthService";

import IUserService from "./InterfaceAdapters/IServices/IUserService";
import IRoleService from "./InterfaceAdapters/IServices/IRoleService";
import IItemService from "./InterfaceAdapters/IServices/IItemService";
import IAuthService from "./InterfaceAdapters/IServices/IAuthService";

const container = new Container();

/* IServices */
container.bind<IUserService>(SERVICES.IUserService).to(UserService);
container.bind<IRoleService>(SERVICES.IRoleService).to(RoleService);
container.bind<IItemService>(SERVICES.IItemService).to(ItemService);
container.bind<IAuthService>(SERVICES.IAuthService).to(AuthService);

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);

export let { lazyInject } = getDecorators(container);

export default container;