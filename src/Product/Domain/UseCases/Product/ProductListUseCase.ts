import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../../Shared/Infrastructure/Orm/IPaginator';
import { REPOSITORIES } from '../../../../Config/Injects';
import IProductRepository from '../../../Infrastructure/Repositories/IProductRepository';

class ProductListUseCase
{
    private productRepository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.productRepository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.productRepository.list(payload);
    }
}

export default ProductListUseCase;
