import IBaseRepository from '../../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../../Shared/Infrastructure/Orm/IPaginator';

interface IRoleRepository extends Omit<IBaseRepository<IRoleDomain>, 'getInBy' | 'getBy' | 'getOneBy' | 'delete' | 'update'>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(name: string): Promise<any>;
    update(element: IRoleDomain, id: string): Promise<IRoleDomain>;
}

export default IRoleRepository;
