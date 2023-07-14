import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IItemDomain from '../../Domain/Entities/IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IItemRepository;
