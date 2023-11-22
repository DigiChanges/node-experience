import IBaseRepository from '../../../Main/Infrastructure/Repositories/IBaseRepository';
import IItemDomain from '../../Domain/Entities/IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain> {}

export default IItemRepository;
