import IFileDomain from '../Entities/IFileDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getOne(id: string): Promise<IFileDomain>;
}

export default IFileRepository;
