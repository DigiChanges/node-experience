import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

interface IProductRepository extends IBaseRepository<IProductDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
    getOneCategoryEnable(payload: IdPayload): Promise<IProductDomain>;
}

export default IProductRepository;
