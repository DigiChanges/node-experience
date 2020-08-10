import { lazyInject } from '../../../inversify.config'
import ItemUpdatePayload from "../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";
import IItemRepository from "../../../InterfaceAdapters/IRepositories/IItemRepository";
import {REPOSITORIES} from "../../../repositories";
import IItemDomain from "../../../InterfaceAdapters/IDomain/IItemDomain";

class UpdateItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        const id = payload.id();
        const item = await this.repository.getOne(id);

        item.name = payload.name();
        item.type = payload.type();

        await this.repository.save(item);

        return item;
    }
}

export default UpdateItemUseCase;
