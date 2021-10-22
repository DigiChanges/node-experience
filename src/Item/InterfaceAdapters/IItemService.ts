import IItemDomain from './IItemDomain';
import ItemRepPayload from './Payloads/ItemRepPayload';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import ItemUpdatePayload from './Payloads/ItemUpdatePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IItemService
{
    persist(item: IItemDomain, payload: ItemRepPayload): Promise<IItemDomain>;
    create(payload: ItemRepPayload, auth_user: IUserDomain): Promise<IItemDomain>;
    update(payload: ItemUpdatePayload, auth_user: IUserDomain): Promise<IItemDomain>;
    getOne(id: string): Promise<IItemDomain>;
    remove(id: string): Promise<IItemDomain>;
    list(payload: ICriteria): Promise<IPaginator>;
}

export default IItemService;
