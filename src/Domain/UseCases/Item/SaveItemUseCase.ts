import { lazyInject } from '../../../inversify.config'
import ItemRepPayload from "../../../InterfaceAdapters/Payloads/Items/ItemRepPayload";
import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";
import Item from "../../../Domain/Entities/Item";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class SaveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload): Promise<IItemDomain>
    {
        let item = new Item();
        item.name = payload.getName();
        item.type = payload.getType();

        item = await this.repository.save(item);

        return item;
    }
}

export default SaveItemUseCase;
