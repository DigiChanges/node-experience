import { IsArray, IsUUID } from 'class-validator';

import UserAssignRolePayload from '../../Domain/Payloads/UserAssignRolePayload';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';

class UserAssignRoleRequest extends IdRequest implements UserAssignRolePayload
{
    private readonly _rolesId: string[];

    constructor(data: Record<string, any>, id: string)
    {
        super({ id });
        this._rolesId = data.rolesId;
    }

    @IsArray()
    @IsUUID('4', {
        each: true
    })
    get rolesId(): string[]
    {
        return this._rolesId;
    }
}

export default UserAssignRoleRequest;
