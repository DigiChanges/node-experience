import faker from 'faker';
import IItemRepository from '../Repositories/IItemRepository';
import Item from '../../Domain/Entities/Item';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import User from '../../../User/Domain/Entities/User';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/MainConfig';
import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';

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

        const user = await this.createUser();

        for await (const index of indexes)
        {
            const name = faker.name.title();
            const type = faker.datatype.number();

            const item = new Item({ name, type });

            item.createdBy = user;
            item.lastModifiedBy = user;

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
