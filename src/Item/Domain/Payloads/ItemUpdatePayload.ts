import { IdPayload } from '@digichanges/shared-experience';
import ItemRepPayload from './ItemRepPayload';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;
