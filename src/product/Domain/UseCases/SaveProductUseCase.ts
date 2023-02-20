import ProductRepPayload from '../Payloads/IProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductBuilder from '../Factories/IProductBuilder';

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
        const Product: IProductDomain = new ProductBuilder(payload)
            .setProduct()
            .build()
            .create();

        return await this.repository.save(Product);
    }
}

export default SaveProductUseCase;
