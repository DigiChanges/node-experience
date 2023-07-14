import { ICriteria } from '@digichanges/shared-experience';
import { IPaginator } from '@digichanges/shared-experience';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import IByOptions from '../../../Shared/Infrastructure/Repositories/IByOptions';

interface IFileVersionRepository extends IBaseRepository<IFileVersionDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getLastOneByFields(file: string, version?: number, options?: IByOptions): Promise<IFileVersionDomain>;
    getOneByFileIdAndVersion(file: string, version?: number): Promise<IFileVersionDomain>;
    getAllByFileId(file: string): Promise<IFileVersionDomain[]>;
}

export default IFileVersionRepository;
