import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IItemDomain from '../../Domain/Entities/IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IItemRepository;
