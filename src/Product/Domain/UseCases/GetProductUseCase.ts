import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import { REPOSITORIES } from '../../../Config/Injects';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IProductRepository from '../../Infraestructure/Repositories/IProductRepository';
import IProductDomain from '../Entities/IProductDomain';

class GetProductUseCase
{
    private repository: IProductRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: IdPayload): Promise<IProductDomain>
    {
        return await this.repository.getOneProduct(payload);
    }
}

export default GetProductUseCase;
