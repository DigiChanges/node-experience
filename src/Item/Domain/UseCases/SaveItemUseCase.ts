import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Item from '../Entities/Item';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class SaveItemUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IItemRepository>(REPOSITORIES.IItemRepository);
    }

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
