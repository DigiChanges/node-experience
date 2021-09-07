import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Item from '../Entities/Item';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class SaveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        const item = new Item();

        item.setName(payload.getName());
        item.setType(payload.getType());
        item.setCreatedBy(authUser);
        item.setLastModifiedBy(authUser);

        return await this.repository.save(item);
    }
}

export default SaveItemUseCase;
