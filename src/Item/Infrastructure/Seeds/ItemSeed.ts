import faker from 'faker';
import IItemRepository from '../Repositories/IItemRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserRepository from '../../../Auth/Infrastructure/Repositories/User/IUserRepository';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import ItemBuilder from '../../Domain/Factories/ItemBuilder';

class ItemSeed extends BaseSeed
{
    private repository: IItemRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        super();
        this.repository = this.container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
        this.userRepository = this.container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        for await (const index of indexes)
        {
            const name = faker.name.title();
            const type = faker.datatype.number();

            const item: IItemDomain = new ItemBuilder({ name, type })
                .setItem()
                .build()
                .create();

            await this.repository.save(item);
        }
    }
}

export default ItemSeed;
