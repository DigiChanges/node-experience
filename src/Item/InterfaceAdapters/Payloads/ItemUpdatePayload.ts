import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import ItemRepPayload from './ItemRepPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;