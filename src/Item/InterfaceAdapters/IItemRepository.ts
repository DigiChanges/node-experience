import IBaseRepository from '../../App/InterfaceAcapters/IBaseRepository';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import Item from '../Domain/Entities/Item';

interface IItemRepository extends IBaseRepository<Item>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IItemRepository;
