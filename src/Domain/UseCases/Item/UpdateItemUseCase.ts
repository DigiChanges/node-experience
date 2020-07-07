import { lazyInject } from '../../../inversify.config'
import IItem from "../../../InterfaceAdapters/IEntities/IItem";
import ItemUpdatePayload from "../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";

class UpdateItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload): Promise<IItem>
    {
        const id = payload.id();
        const item = await this.repository.findOne(id);

        item.name = payload.name();
        item.type = payload.type();
        item.enable = payload.enable();

        await this.repository.save(item);

        return item;
    }
}

export default UpdateItemUseCase;
