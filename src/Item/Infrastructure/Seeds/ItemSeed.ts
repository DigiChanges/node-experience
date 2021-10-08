import faker from 'faker';
import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import Item from '../../Domain/Entities/Item';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/repositories';
import ISeed from '../../../Shared/InterfaceAdapters/ISeed';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import User from '../../../User/Domain/Entities/User';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import { IEncryption } from '@digichanges/shared-experience';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';

class ItemSeed implements ISeed
{
    @containerFactory(REPOSITORIES.IItemRepository)
    private repository: IItemRepository;

    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

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
            item.created_by = user;
            item.last_modified_by = user;

            await this.repository.save(item);
        }
    }

    private async createUser(): Promise<IUserDomain>
    {
        const user: IUserDomain = new User();

        user.first_name = 'test';
        user.last_name = 'item';
        user.email = 'testitem@node.com';
        user.birthday = '05/07/1992';
        user.document_type = 'dni';
        user.document_number = '3531915736';
        user.gender = 'male';
        user.phone = '2234456999';
        user.country = 'Argentina';
        user.address = 'New America 123';
        user.password = await this.encryption.encrypt('123456789');
        user.enable = true;
        user.confirmation_token = null;
        user.password_requested_at = null;
        user.permissions = [];
        user.roles = [];
        user.is_super_admin = false;

        return await this.userRepository.save(user);
    }
}

export default ItemSeed;
