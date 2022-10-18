import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    rolesId: string[];
}

export default UserAssignRolePayload;
