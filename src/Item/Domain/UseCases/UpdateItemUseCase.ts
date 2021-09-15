import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import Item from '../Entities/Item';

class UpdateItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemUpdatePayload, authUser: IUserDomain): Promise<Item>
    {
        const id = payload.getId();

        const item = await this.repository.getOne(id);

        item.Name = payload.getName();
        item.Type = payload.getType();
        item.LastModifiedBy = authUser;

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
