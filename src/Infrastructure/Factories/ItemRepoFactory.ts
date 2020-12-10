import container from "../../inversify.config";
import {REPOSITORIES} from "../../repositories";
import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";

class ItemRepoFactory
{
    static create()
    {
        return container.get<IItemRepository>(REPOSITORIES.IItemRepository);
    }
}

export default ItemRepoFactory;
