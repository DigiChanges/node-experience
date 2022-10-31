import { Mixin } from 'ts-mixer';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import ItemRepRequest from './ItemRepRequest';

class ItemUpdateRequest extends Mixin(ItemRepRequest, IdRequest) implements ItemUpdatePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
        this._id = data.id;
    }
}

export default ItemUpdateRequest;
