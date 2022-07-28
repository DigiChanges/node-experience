import IBaseRepository from '../../../App/Infrastructure/Repositories/IBaseRepository';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import IItemDomain from '../../Domain/Entities/IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IItemRepository;
