import ProductUpdatePayload from '../Payloads/IProductUpdatePayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductBuilder from '../Factories/IProductBuilder';

class UpdateProductUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ProductUpdatePayload): Promise<IProductDomain>
    {
        let Product: IProductDomain = await this.repository.getOne(payload.id);

        Product = new ProductBuilder(payload)
            .setProduct(Product)
            .build()
            .update();

        return await this.repository.update(Product);
    }
}

export default UpdateProductUseCase;
