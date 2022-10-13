import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import IByOptions from '../../../Shared/Infrastructure/Repositories/IByOptions';

interface IFileVersionRepository extends IBaseRepository<IFileVersionDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getLastOneBy(conditions: Record<string, any>, options?: IByOptions): Promise<IFileVersionDomain>;
}

export default IFileVersionRepository;
