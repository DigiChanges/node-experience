import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    rolesId: string[];
}

export default UserAssignRolePayload;
