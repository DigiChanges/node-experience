import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    getBySlug(slug: string): Promise<IRoleDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IRoleRepository;
