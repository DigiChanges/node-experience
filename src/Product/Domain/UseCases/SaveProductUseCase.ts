import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../../Product/Infrastructures/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IProductDomain from '../Entities/IProductDomain';
import ProductBuilder from '../Factories/ProductBuilder';
import ProductRepPayload from '../Payloads/ProductRepPayload';

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
