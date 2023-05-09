import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';
import IProductRepository from '../../Infraestructure/Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IProductDomain from '../Entities/IProductDomain';

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
        const { id } = payload;
        const product = await this.repository.getOne(id);
        product.updateBuild(payload);
        return await this.repository.update(product);
    }
}

export default UpdateProductUseCase;
