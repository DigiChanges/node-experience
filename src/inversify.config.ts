import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";
import ItemService from "./Services/ItemService";
import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import {TYPES} from "./types";
import {REPOSITORIES} from "./repositories";
import IItemRepository from "./Repositories/Contracts/IItemRepository";
import Responder from "./Lib/Responder";
import ItemRepository from "./Repositories/Concrets/ItemRepository";

const container = new Container();

/* Services */
container.bind<ItemService>(ItemService).toSelf();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemRepository);

export default container;