import IBaseRepository from '../../App/InterfaceAcapters/IBaseRepository';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import IItemDomain from './IItemDomain';

interface IItemRepository extends IBaseRepository<IItemDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IItemRepository;
