import { ICriteria } from '@digichanges/shared-experience';
import { IPaginator } from '@digichanges/shared-experience';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import IByOptions from '../../../Main/Domain/Repositories/IByOptions';

interface IFileVersionRepository extends IBaseRepository<IFileVersionDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getLastOneByFields(file: string, version?: number, options?: IByOptions): Promise<IFileVersionDomain>;
    getOneByFileIdAndVersion(file: string, version?: number): Promise<IFileVersionDomain>;
    getAllByFileId(file: string): Promise<IFileVersionDomain[]>;
}

export default IFileVersionRepository;
