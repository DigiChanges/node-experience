import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';

interface UserAssignRolePayload extends IdPayload
{
    getRolesId(): string[];
}

export default UserAssignRolePayload;
