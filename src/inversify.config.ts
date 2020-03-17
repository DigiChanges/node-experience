import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";
import ItemService from "./Services/ItemService";
import FormatResponder from "./Lib/FormatResponder";
import IFormatResponder from "./Lib/IFormatResponder";
import {TYPES} from "./types";
import Responder from "./Lib/Responder";

const container = new Container();

/* Services */
container.bind<ItemService>(ItemService).toSelf();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

export default container;