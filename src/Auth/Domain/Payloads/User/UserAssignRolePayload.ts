import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    roles: Record<string, any>[];
}

export default UserAssignRolePayload;
