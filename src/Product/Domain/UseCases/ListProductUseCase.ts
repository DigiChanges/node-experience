import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../../Product/Infrastructures/Repositories/IProductRepository';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class ListProductUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListProductUseCase;
