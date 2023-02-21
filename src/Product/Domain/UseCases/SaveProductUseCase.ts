
import { getRequestContext } from './../../../Shared/Presentation/Shared/RequestContext';
import ProductRepPayload from '../Payloads/ProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import ProductBuilder from '../Factories/ProductBuilder';
import ICategoryRepository from '../../../Category/Infrastructure/Repositories/ICategoryRepository';
import ICategoryDomain from 'Category/Domain/Entities/ICategoryDomain';


class SaveProductUseCase
{
    private repository: IProductRepository;
    private repositoryCategory: ICategoryRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.repositoryCategory = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async handle(payload: ProductRepPayload): Promise<IProductDomain>
    {
        const id = payload.category.getId();

        const category: ICategoryDomain = await this.repositoryCategory.getOne(id);

        const Product: IProductDomain = new ProductBuilder(payload)

            .setProduct()
            .build()
            .create();

        Product.category = category;

        return await this.repository.save(Product);
    }
}

export default SaveProductUseCase;
