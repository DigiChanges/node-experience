import { IBaseDomain } from '@digichanges/shared-experience';
import ItemRepPayload from '../Payloads/ItemRepPayload';

interface IItemDomain extends IBaseDomain, ItemRepPayload {}

export default IItemDomain;
