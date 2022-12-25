import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ItemRepPayload from '../Payloads/ItemRepPayload';

interface IItemDomain extends IBaseDomain, ItemRepPayload
{
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IItemDomain;
