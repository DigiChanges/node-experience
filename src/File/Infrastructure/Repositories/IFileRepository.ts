import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import IBaseRepository from '../../../App/Infrastructure/Repositories/IBaseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default IFileRepository;
