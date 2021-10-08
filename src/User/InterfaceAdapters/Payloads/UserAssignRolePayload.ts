import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    get_roles_id(): string[];
}

export default UserAssignRolePayload;
