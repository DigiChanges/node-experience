import { lazyInject } from '../../../inversify.config'
import ItemRepPayload from "../../../InterfaceAdapters/Payloads/Items/ItemRepPayload";
import IItem from "../../../InterfaceAdapters/IEntities/IItem";
import Item from "../../../Infrastructure/Entities/Item";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class SaveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload): Promise<IItem>
    {
        const item = new Item();
        item.name = payload.name();
        item.type = payload.type();
        item.enable = payload.enable();

        await this.repository.save(item);

        return item;
    }
}

export default SaveItemUseCase;
