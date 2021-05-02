import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Item from '../Entities/Item';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class SaveItemUseCase
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    async handle(payload: ItemRepPayload): Promise<IItemDomain>
    {
        let item: IItemDomain = new Item();
        item.name = payload.getName();
        item.type = payload.getType();

        item = await this.repository.save(item);

        return item;
    }
}

export default SaveItemUseCase;
