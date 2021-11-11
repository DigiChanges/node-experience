import { decorate, Mixin } from 'ts-mixer';
import RoleUpdatePayload from '../../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import RoleRepRequest from './RoleRepRequest';

class RoleUpdateRequest extends Mixin(RoleRepRequest, IdRequest) implements RoleUpdatePayload
{
    constructor(data: Record<string, any>, id: string)
    {
        super(data);
        this.id = id;
    }
}

export default RoleUpdateRequest;
