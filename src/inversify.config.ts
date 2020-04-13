import "reflect-metadata";
import {Container} from "inversify";
import ItemService from "./Services/ItemService";
import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import {TYPES} from "./types";
import {REPOSITORIES} from "./repositories";
import IItemRepository from "./Repositories/Contracts/IItemRepository";
import Responder from "./Lib/Responder";
import ItemMongoRepository from "./Repositories/Concrets/ItemMongoRepository";
import IUserRepository from "./Repositories/Contracts/IUserRepository";
import UserMongoRepository from "./Repositories/Concrets/UserMongoRepository";
import UserService from "./Services/UserService";
import IEncription from "./Lib/Encription/IEncription";
import Encription from "./Lib/Encription/Encription";
import IEncriptionStrategy from "./Lib/Encription/IEncriptionStrategy";
import BcryptEncriptionStrategy from "./Lib/Encription/BcryptEncriptionStrategy";
import AuthService from "./Services/AuthService";

const container = new Container();

/* Services */
container.bind<ItemService>(ItemService).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<AuthService>(AuthService).toSelf();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);
container.bind<IEncription>(TYPES.IEncription).to(Encription);
container.bind<IEncriptionStrategy>(TYPES.IEncriptionStrategy).to(BcryptEncriptionStrategy);

/* Repositories */
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);

export default container;