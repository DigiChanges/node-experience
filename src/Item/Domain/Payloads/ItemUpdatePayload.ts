import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemRepPayload from './ItemRepPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;
