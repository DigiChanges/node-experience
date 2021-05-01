import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    getRolesId(): string[];
}

export default UserAssignRolePayload;
