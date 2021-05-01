import faker from 'faker';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import Item from '../../Domain/Entities/Item';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ContainerFactory from '../../../Shared/Decorators/ContainerFactory';
import {REPOSITORIES} from '../../../repositories';

class ItemSeedFactory
{
    private itemRepo: IItemRepository;

    constructor()
    {
        this.itemRepo = ContainerFactory.create<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    public async init()
    {
        const indexes = Array.from({length: 10}, (v, i) => i + 1);

        for await (const index of indexes)
        {
            const title = faker.name.title();
            const type = faker.datatype.number();

            const item: IItemDomain = new Item();

            item.name = title;
            item.type = type;

            await this.itemRepo.save(item);
        }
    }
}

export default ItemSeedFactory;