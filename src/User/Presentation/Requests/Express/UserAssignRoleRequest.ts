import { IsArray, IsUUID } from 'class-validator';

import UserAssignRolePayload from '../../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';

class UserAssignRoleRequest extends IdRequest implements UserAssignRolePayload
{
    @IsArray()
    @IsUUID('4', {
        each: true
    })
    roles_id: string[]

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.roles_id = data.roles_id;
    }

    get_roles_id(): string[]
    {
        return this.roles_id;
    }
}

export default UserAssignRoleRequest;
