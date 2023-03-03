import faker from 'faker';
import ICategoryRepository from '../Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import User from '../../../Auth/Domain/Entities/User';
import IUserRepository from '../../../Auth/Infrastructure/Repositories/IUserRepository';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/MainConfig';
import IRoleDomain from '../../../Auth/Domain/Entities/IRoleDomain';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import CategoryBuilder from '../../Domain/Factories/CategoryBuilder';

class CategorySeed extends BaseSeed
{
    private repository: ICategoryRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        super();
        this.repository = this.container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
        this.userRepository = this.container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        const authUser = await this.createUser();

        for await (const index of indexes)
        {
            const title = faker.name.title();
            const enable = faker.datatype.boolean();

            const category: ICategoryDomain = new CategoryBuilder({ title, enable, createdBy: authUser })
                .setCategory()
                .build()
                .create();

            await this.repository.save(category);
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

export default CategorySeed;
