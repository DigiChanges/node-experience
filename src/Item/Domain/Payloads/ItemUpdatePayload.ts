import ItemRepPayload from './ItemRepPayload';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;
