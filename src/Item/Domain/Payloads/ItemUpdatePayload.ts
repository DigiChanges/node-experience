import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemRepPayload from './ItemRepPayload';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;
