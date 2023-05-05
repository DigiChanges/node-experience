import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';

interface ICategoryRepository extends IBaseRepository<ICategoryDomain> {
    list(): Promise<ICategoryDomain[]>
}

export default ICategoryRepository;
