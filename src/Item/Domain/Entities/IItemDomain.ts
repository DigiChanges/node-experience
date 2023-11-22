import ItemRepPayload from '../Payloads/ItemRepPayload';
import { IBaseExtendDomain } from '../../../Main/Domain/IBaseExtendDomain';

interface IItemDomain extends IBaseExtendDomain, ItemRepPayload {}

export default IItemDomain;
