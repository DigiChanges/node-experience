import ChangeUserPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import {Mixin} from 'ts-mixer';
import UserRepPasswordRequest from './UserRepPasswordRequest';

class ChangeUserPasswordRequest extends Mixin(UserRepPasswordRequest, IdRequest) implements ChangeUserPasswordPayload
{
    constructor(data: Record<string, any>, id: string)
    {
        super(data);
        this.id = id;
    }
}

export default ChangeUserPasswordRequest;
