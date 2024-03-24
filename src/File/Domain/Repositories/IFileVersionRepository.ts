import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import IByOptions from '../../../Main/Domain/Repositories/IByOptions';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

interface IFileVersionRepository extends IBaseRepository<IFileVersionDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getLastOneByFields(file: string, version?: number, options?: IByOptions): Promise<IFileVersionDomain>;
    getOneByFileIdAndVersion(file: string, version?: number): Promise<IFileVersionDomain>;
    getAllByFileId(file: string): Promise<IFileVersionDomain[]>;
}

export default IFileVersionRepository;
