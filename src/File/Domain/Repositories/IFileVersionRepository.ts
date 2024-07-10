import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import IByOptions from '../../../Main/Domain/Repositories/IByOptions';

abstract class IFileVersionRepository extends IBaseRepository<IFileVersionDomain>
{
    abstract getLastOneByFields(file: string, version?: number, options?: IByOptions): Promise<IFileVersionDomain>;
    abstract getOneByFileIdAndVersion(file: string, version?: number): Promise<IFileVersionDomain>;
    abstract getAllByFileId(file: string): Promise<IFileVersionDomain[]>;
}

export default IFileVersionRepository;
