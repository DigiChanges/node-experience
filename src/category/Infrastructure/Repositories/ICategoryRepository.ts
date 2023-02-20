import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICategoryDomain from 'category/Domain/Entities/CategoryDomain';

interface ICategoryRepository extends IBaseRepository<ICategoryDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default ICategoryRepository;
