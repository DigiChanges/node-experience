import "reflect-metadata";
import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import {TYPES} from "./types";
import {REPOSITORIES} from "./repositories";
import {SERVICES} from "./services";

import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import Responder from "./Lib/Responder";

import IItemRepository from "./Infrastructure/Repositories/Contracts/IItemRepository";
import ItemMongoRepository from "./Infrastructure/Repositories/Concrets/ItemMongoRepository";
import IUserRepository from "./Infrastructure/Repositories/Contracts/IUserRepository";
import UserMongoRepository from "./Infrastructure/Repositories/Concrets/UserMongoRepository";
import IRoleRepository from "./Infrastructure/Repositories/Contracts/IRoleRepository";
import RoleMongoRepository from "./Infrastructure/Repositories/Concrets/RoleMongoRepository";

import UserService from "./Domain/Services/UserService";
import ItemService from "./Domain/Services/ItemService";
import RoleService from "./Domain/Services/RoleService";
import AuthService from "./Domain/Services/AuthService";

import IUserService from "./Domain/Services/Contracts/IUserService";
import IRoleService from "./Domain/Services/Contracts/IRoleService";
import IItemService from "./Domain/Services/Contracts/IItemService";
import IAuthService from "./Domain/Services/Contracts/IAuthService";

const container = new Container();

/* Services */
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