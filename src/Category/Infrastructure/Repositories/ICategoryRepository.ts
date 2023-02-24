import ICategoryDomain from '../../../Category/Domain/Entities/ICategoryDomain';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

interface ICategoryRepository extends IBaseRepository<ICategoryDomain> {

    list(criteria: ICriteria): Promise<IPaginator>

}

export default ICategoryRepository;
