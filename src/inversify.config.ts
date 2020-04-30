import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {REPOSITORIES} from "./repositories";
import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import Responder from "./Lib/Responder";

import IItemRepository from "./Repositories/Contracts/IItemRepository";
import ItemMongoRepository from "./Repositories/Concrets/ItemMongoRepository";
import IUserRepository from "./Repositories/Contracts/IUserRepository";
import UserMongoRepository from "./Repositories/Concrets/UserMongoRepository";
import IRoleRepository from "./Repositories/Contracts/IRoleRepository";
import RoleMongoRepository from "./Repositories/Concrets/RoleMongoRepository";

import UserService from "./Services/UserService";
import ItemService from "./Services/ItemService";
import RoleService from "./Services/RoleService";
import AuthService from "./Services/AuthService";

import IEncription from "./Lib/Encription/IEncription";
import Encription from "./Lib/Encription/Encription";
import IEncriptionStrategy from "./Lib/Encription/IEncriptionStrategy";
import BcryptEncriptionStrategy from "./Lib/Encription/BcryptEncriptionStrategy";
import IUserService from "./Services/Contracts/IUserService";
import IRoleService from "./Services/Contracts/IRoleService";
import {SERVICES} from "./services";
import IItemService from "./Services/Contracts/IItemService";

const container = new Container();

/* Services */
container.bind<IUserService>(SERVICES.IUserService).to(UserService);
container.bind<IRoleService>(SERVICES.IRoleService).to(RoleService);
container.bind<IItemService>(SERVICES.IItemService).to(ItemService);
container.bind<AuthService>(AuthService).toSelf();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);
container.bind<IEncription>(TYPES.IEncription).to(Encription);
container.bind<IEncriptionStrategy>(TYPES.IEncriptionStrategy).to(BcryptEncriptionStrategy);

/* Repositories */
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);

export default container;