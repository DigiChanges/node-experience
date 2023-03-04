import faker from 'faker';
import IProductRepository from '../Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import User from '../../../Auth/Domain/Entities/User';
import IUserRepository from '../../../Auth/Infrastructure/Repositories/IUserRepository';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/MainConfig';
import IRoleDomain from '../../../Auth/Domain/Entities/IRoleDomain';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductBuilder from '../../Domain/Factories/ProductBuilder';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import Category from '../../../Category/Domain/Entities/Category';
import { UUID } from '@deepkit/type';

class ProductSeed extends BaseSeed
{
    private repository: IProductRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        super();
        this.repository = this.container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.userRepository = this.container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        const authUser = await this.createUser();

        for await (const index of indexes)
        {
            const price = faker.datatype.number();
            const title = faker.name.title();
            const enable = faker.datatype.boolean();
            const category = {
                title: faker.name.title(),
                enable: faker.datatype.boolean(),
                createdBy: undefined,
                lastModifiedBy: undefined,
                _id: faker.datatype.uuid(),
                createdAt: undefined,
                updatedAt: undefined
            } as Category;

            const product: IProductDomain = new ProductBuilder({ price, title, enable, category, createdBy: authUser })
                .setProduct()
                .build()
                .create();

            await this.repository.save(product);
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

export default ProductSeed;
