import { Mixin } from 'ts-mixer';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import ItemRepRequest from './ItemRepRequest';
import IUserDomain from 'User/Domain/Entities/IUserDomain';

class ItemUpdateRequest extends Mixin(ItemRepRequest, IdRequest) implements ItemUpdatePayload
{
    private readonly _authUser: IUserDomain;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._id = data.id;
        this._authUser = data.authUser;
    }

    get authUser(): IUserDomain
    {
        return this._authUser;
    }
}

export default ItemUpdateRequest;
