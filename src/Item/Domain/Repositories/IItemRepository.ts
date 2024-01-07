import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';
import IItemDomain from '../Entities/IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain> {}

export default IItemRepository;
