import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../../Product/Infrastructures/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IProductDomain from '../Entities/IProductDomain';
import ProductBuilder from '../Factories/ProductBuilder';
import ProductUpdatePayload from '../Payloads/ProductUpdatePayload';


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
        let product: IProductDomain = await this.repository.getOne(payload.id);

        product = new ProductBuilder(payload)
            .setProduct(product)
            .build()
            .update();

        return await this.repository.update(product);
    }
}

export default UpdateProductUseCase;
