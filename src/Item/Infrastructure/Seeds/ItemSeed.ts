import faker from 'faker';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import Item from '../../Domain/Entities/Item';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../repositories';
import ISeed from '../../../Shared/InterfaceAdapters/ISeed';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import User from '../../../User/Domain/Entities/User';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import Password from '../../../App/Domain/ValueObjects/Password';

class ItemSeed implements ISeed
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository;


    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        const user = await this.createUser();

        for await (const index of indexes)
        {
            const title = faker.name.title();
            const type = faker.datatype.number();

            const item = new Item();

            item.name = title;
            item.type = type;
            item.createdBy = user;
            item.lastModifiedBy = user;

            await this.repository.save(item);
        }
    }

    private async createUser(): Promise<IUserDomain>
    {
        const user: IUserDomain = new User();

        user.firstName = 'test';
        user.lastName = 'item';
        user.email = 'testitem@node.com';
        user.birthday = '05/07/1992';
        user.documentType = 'dni';
        user.documentNumber = '3531915736';
        user.gender = 'male';
        user.phone = '2234456999';
        user.country = 'Argentina';
        user.address = 'New America 123';

        const password = new Password('123456789');
        await password.ready();
        user.password = password;

        user.enable = true;
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.permissions = [];
        user.roles = [];
        user.isSuperAdmin = false;

        return await this.userRepository.save(user);
    }
}

export default ItemSeed;
