import ProductRepPayload from '../Payloads/ProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductBuilder from '../Factories/ProductBuilder';
import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
class SaveProductUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ProductRepPayload): Promise<IProductDomain>
    {
        const product: IProductDomain = new ProductBuilder(payload)
            .setProduct()
            .build()
            .create();

        return await this.repository.save(product);
    }
}

export default SaveProductUseCase;
