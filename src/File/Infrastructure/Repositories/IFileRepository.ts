import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Domain/Payloads/IPaginator';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default IFileRepository;
