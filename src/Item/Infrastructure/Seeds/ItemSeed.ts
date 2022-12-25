import faker from 'faker';
import IItemRepository from '../Repositories/IItemRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import User from '../../../Auth/Domain/Entities/User';
import IUserRepository from '../../../Auth/Infrastructure/Repositories/IUserRepository';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/MainConfig';
import IRoleDomain from '../../../Auth/Domain/Entities/IRoleDomain';
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

        const authUser = await this.createUser();

        for await (const index of indexes)
        {
            const name = faker.name.title();
            const type = faker.datatype.number();

            const item: IItemDomain = new ItemBuilder({ name, type, createdBy: authUser })
                .setItem()
                .build()
                .create();

            await this.repository.save(item);
        }
    }

    private async createUser(): Promise<IUserDomain>
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        const roles: IRoleDomain[] = [];
        const permissions: string[] = [];

        const payloadUser = {
            firstName: 'test',
            lastName: 'item',
            email: 'testitem@node.com',
            birthday: '05/07/1992',
            documentType: 'dni',
            documentNumber: '3531915736',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: true,
            permissions,
            roles,
            isSuperAdmin: false
        };

        const user: IUserDomain = new User(payloadUser);
        user.password = await (new Password('123456789', minLength, maxLength)).ready();

        return await this.userRepository.save(user);
    }
}

export default ItemSeed;
