import { faker } from '@faker-js/faker';
import IItemRepository from '../Repositories/IItemRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import ItemBuilder from '../../Domain/Factories/ItemBuilder';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';

class ItemSeed extends BaseSeed implements ISeed
{
    private repository: IItemRepository;

    constructor()
    {
        super();
        this.repository = this.container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        for await (const index of indexes)
        {
            const name = faker.person.firstName();
            const type = faker.number.int({ max: 100 });

            const item: IItemDomain = new ItemBuilder({ name, type })
                .setItem()
                .build()
                .create();

            await this.repository.save(item);
        }
    }
}

export default ItemSeed;
