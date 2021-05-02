import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import ItemRepPayload from './ItemRepPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;