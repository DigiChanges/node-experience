import { ICriteria } from '@digichanges/shared-experience';
import { IPaginator } from '@digichanges/shared-experience';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getOne(id: string): Promise<IFileDomain>;
}

export default IFileRepository;
