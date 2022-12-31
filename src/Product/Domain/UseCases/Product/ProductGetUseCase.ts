import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import IProductDomain from '../../Entities/IProductDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IProductRepository from '../../../Infrastructure/Repositories/IProductRepository';

class ProductGetUseCase
{
    private productRepository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.productRepository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }
    async handle(payload: IdPayload): Promise<IProductDomain>
    {
        return this.productRepository.getOne(payload.id);
    }
}

export default ProductGetUseCase;
