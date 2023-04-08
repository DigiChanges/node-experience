import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import ItemRepPayload from '../Payloads/ItemRepPayload';

interface IItemDomain extends IBaseDomain, ItemRepPayload {}

export default IItemDomain;
