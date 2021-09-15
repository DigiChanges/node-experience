import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import Item from '../Entities/Item';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class SaveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload, authUser: IUserDomain): Promise<Item>
    {
        const item = new Item();

        item.Name = payload.getName();
        item.Type = payload.getType();
        item.CreatedBy = authUser;
        item.LastModifiedBy = authUser;

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;