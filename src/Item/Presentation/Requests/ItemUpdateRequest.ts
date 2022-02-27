import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import ItemRepRequest from './ItemRepRequest';
import { Mixin } from 'ts-mixer';


class ItemUpdateRequest extends Mixin(ItemRepRequest, IdRequest) implements ItemUpdatePayload
{
    constructor(data: Record<string, any>, id: string)
    {
        super(data);
        this.id = id;
    }
}

export default ItemUpdateRequest;
