import "reflect-metadata";
import { Container } from "inversify";
import ItemService from "./Services/ItemService";

const container = new Container();

container.bind<ItemService>(ItemService).toSelf();

export default container;