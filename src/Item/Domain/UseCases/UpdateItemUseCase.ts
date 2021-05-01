import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class UpdateItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        const item = await this.repository.getOne(id);

        item.name = payload.getName();
        item.type = payload.getType();

        await this.repository.save(item);

        return item;
    }
}

export default UpdateItemUseCase;
