import IFileDomain from '../Entities/IFileDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import { ICriteria } from '../../../Main/Domain/Criteria';
import ResponsePayload from '../../../Shared/Utils/ResponsePayload';

interface IFileRepository extends IBaseRepository<IFileDomain>
{
    list(criteria: ICriteria): Promise<ResponsePayload<IFileDomain>>;
    getOne(id: string): Promise<IFileDomain>;
}

export default IFileRepository;
